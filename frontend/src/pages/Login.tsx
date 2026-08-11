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
            window.location.href = "/dashboard";
            alert("Login berhasil");
        } catch (e) {
            alert("Login gagal");
        }
    };

    return (
        <>
            <section className="bg-light p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                            <div className="card border border-light-subtle rounded-4">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-5">
                                                <div className="text-center mb-4">
                                                    <a href="#!">
                                                        <img
                                                            src="./assets/img/bsb-logo.svg"
                                                            alt="Logo Tarigan Gadai"
                                                            width="175"
                                                            height="57"
                                                        />
                                                    </a>
                                                </div>
                                                <h4 className="text-center">
                                                    Log In
                                                </h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="row gy-3 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        id="name"
                                                        placeholder="name@example.com"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="name" className="form-label">
                                                        Username
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="password" className="form-label">
                                                        Password
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button
                                                        className="btn bsb-btn-xl btn-primary"
                                                        onClick={login}
                                                    >
                                                        Log in now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <hr className="mt-5 mb-4 border-secondary-subtle" />
                                            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                                               <a href="#!" className="link-secondary text-decoration-none">
                                                    Forgot password
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}