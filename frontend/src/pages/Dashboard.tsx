import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  function keluar() {
    logout();
    window.location.href = "/";
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard</h1>

      <p>Login berhasil menggunakan JWT.</p>

      <button onClick={keluar}>
        Logout
      </button>
    </div>
  );
}