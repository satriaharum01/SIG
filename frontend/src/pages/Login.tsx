import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login: authLogin } = useAuth();

    const login = async () => {
        try {
            const { data } = await api.post("/auth/login", {
                username,
                password,
            });

            authLogin(data.data.token);
            alert("Login berhasil");
            window.location.href = "/dashboard";
        } catch (e) {
            alert("Login gagal");
        }
    };

    return (
        <div style={{ maxWidth: 350, margin: "100px auto" }}>
            <h2>Login</h2>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br /><br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />
            <button onClick={login}>Login</button>
        </div>
    );
}