import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  // Pada React 19, SyntheticEvent<HTMLFormElement> adalah tipe standar paling aman untuk onSubmit
  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { data } = await api.post("/auth/login", {
        username,
        password,
      });

      const resData = data;
      
      // Sesuaikan pengambilan token dan user dari struktur response API Anda
      const token = data.token || data.data?.token;
      const userData = resData.user || resData.data?.user || resData.data;

      authLogin(token, userData);

      // Navigasi aman di Client-side (SPA) tanpa reload penuh
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ||
          "Login gagal. Silakan periksa username dan password Anda!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5 min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
            <div className="card border border-light-subtle rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-4 text-center">
                      <a href="#!">
                        <img
                          src="./assets/img/bsb-logo.svg"
                          alt="Logo Tarigan Gadai"
                          width="175"
                          height="57"
                        />
                      </a>
                      <h4 className="mt-3">Log In</h4>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div
                    className="alert alert-danger py-2 text-center text-sm mb-3"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Form dengan handler onSubmit */}
                <form onSubmit={handleLogin}>
                  <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          id="username"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          disabled={loading}
                        />
                        <label htmlFor="username" className="form-label">
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
                          disabled={loading}
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn bsb-btn-xl btn-primary"
                          disabled={loading}
                        >
                          {loading ? "Memproses..." : "Log in now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="col-12">
                    <hr className="mt-4 mb-3 border-secondary-subtle" />
                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                      <a
                        href="#!"
                        className="link-secondary text-decoration-none"
                      >
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
  );
}