import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fungsi tunggal untuk menutup/mengubah state sidebar mobile
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleToggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-minimized" : ""} ${sidebarOpen ? "show" : ""}`}>
      {/* Oper state dan fungsi handler ke Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      <div className="main-wrapper">
        <Header
          onMobileToggle={handleToggleSidebar}
          onDesktopToggle={() => setSidebarCollapsed(prev => !prev)}
        />
        <main className="page-content"><Outlet /></main>
        <Footer />
      </div>
    </div>
  );
}
