import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}