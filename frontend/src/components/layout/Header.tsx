import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Header({ onMobileToggle, onDesktopToggle }) {
  const { user } = useAuth();
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) { await document.documentElement.requestFullscreen(); setFullscreen(true); }
      else { await document.exitFullscreen(); setFullscreen(false); }
    } catch {}
  };

  return (
    <header className="navbar-custom">
      <div className="navbar-left">
        <button className="btn-desktop-toggle d-none d-xl-flex align-items-center justify-content-center me-3" onClick={onDesktopToggle} aria-label="Minimize Sidebar">
          <i className="bi bi-chevron-bar-left" />
        </button>
        <button className="sidebar-toggle-btn me-2" onClick={onMobileToggle} aria-label="Toggle Navigation"><i className="bi bi-list" /></button>
        <div className="dropdown ms-2">
          <button className="btn-quick-action dropdown-toggle" type="button" data-bs-toggle="dropdown"><i className="bi bi-plus-lg" /><span>Create</span></button>
          <ul className="dropdown-menu dropdown-menu-quick-action">
            <li className="dropdown-header">Quick Action Shortcuts</li>
            <li><a className="dropdown-item" href="#"><i className="bi bi-file-earmark-plus" /> New Invoice</a></li>
            <li><a className="dropdown-item" href="#"><i className="bi bi-person-plus" /> New User</a></li>
            <li><a className="dropdown-item" href="#"><i className="bi bi-box-seam" /> New Product</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#"><i className="bi bi-gear" /> System Settings</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-search-wrapper"><input className="navbar-search-input" placeholder="Search anything in Spark..." /><button className="navbar-search-btn"><i className="bi bi-search" /></button></div>
      <div className="navbar-actions">
        <button className="navbar-action-btn me-1" onClick={toggleFullscreen} aria-label="Toggle Fullscreen"><i className={`bi ${fullscreen ? "bi-fullscreen-exit" : "bi-arrows-fullscreen"}`} /></button>
        <div className="dropdown">
          <button className="navbar-action-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside"><i className="bi bi-bell" /><span className="navbar-action-badge" /></button>
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-notification p-0">
            <div className="notification-header"><h6 className="notification-title">Notifications</h6><button className="btn-clear-all">Mark all read</button></div>
            <div className="notification-list">
              {/* LOAD FROM DATABASE: notifikasi */}
              {([]).map((notification) => <a href="#" className="notification-item" key={notification.id}><div className="notification-content"><p className="notification-text">{notification.text}</p><span className="notification-time">{notification.time}</span></div></a>)}
            </div>
            <a href="#" className="notification-footer">View All Notifications</a>
          </div>
        </div>
        <div className="dropdown ms-2">
          <button className="navbar-profile-btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <img src={user.avatar || "/assets/images/avatar.png"} alt="Profile" className="navbar-profile-img" />
            {/* LOAD FROM DATABASE: nama user */}<span className="navbar-profile-name d-none d-md-inline">{user.name}</span><i className="bi bi-chevron-down navbar-profile-caret" />
          </button>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-profile">
            <li className="dropdown-header">Welcome !</li><li><a className="dropdown-item" href="#"><i className="bi bi-person" /> My Account</a></li><li><a className="dropdown-item" href="#"><i className="bi bi-gear" /> Settings</a></li><li><a className="dropdown-item" href="#"><i className="bi bi-lock" /> Lock Screen</a></li><li><hr className="dropdown-divider" /></li><li><a className="dropdown-item text-danger" href="/logout"><i className="bi bi-box-arrow-right" /> Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
