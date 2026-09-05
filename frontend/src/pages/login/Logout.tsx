import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Hapus token dan data user dari state & localStorage
    logout();

    // 2. Arahkan pengguna kembali ke halaman login
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mb-0">Sedang mengeluarkan akun...</p>
      </div>
    </div>
  );
}