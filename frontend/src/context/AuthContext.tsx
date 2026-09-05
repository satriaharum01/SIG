import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import api from "../services/api";

export interface User {
    uuid?: string;
    username: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    isLoading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    getUserByUuid: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token")
    );
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user_data");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_uuid");
        localStorage.removeItem("user_data");
        setToken(null);
        setUser(null);
    }, []);

    const getUserByUuid = useCallback(async () => {
        setIsLoading(true);
        const storedToken = localStorage.getItem("token");
        const storedUuid = localStorage.getItem("user_uuid");

        if (storedToken && storedUuid) {
            setToken(storedToken);

            try {
                const response = await api.get(`/users/${storedUuid}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                const responseData = response.data;
                const userData =
                    responseData.data || responseData.user || responseData;

                setUser(userData);
                localStorage.setItem("user_data", JSON.stringify(userData));
            } catch (error) {
                console.error("Gagal verifikasi sesi user:", error);
                logout();
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [logout]);

    const login = useCallback(
        (newToken: string, userData: User) => {
            localStorage.setItem("token", newToken);

            const uuid = userData?.uuid || (userData as any)?.data?.uuid;
            if (uuid) {
                localStorage.setItem("user_uuid", uuid);
            }

            localStorage.setItem("user_data", JSON.stringify(userData));

            setToken(newToken);
            setUser(userData);
            setIsLoading(false);

            // Jika butuh fetch data terbaru dari API secara otomatis setelah login:
            if (uuid) {
                getUserByUuid();
            }
        },
        [getUserByUuid]
    );

    useEffect(() => {
        getUserByUuid();
    }, [getUserByUuid]);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isLoading,
                login,
                logout,
                getUserByUuid,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth harus digunakan di dalam <AuthProvider>");
    }
    return context;
}