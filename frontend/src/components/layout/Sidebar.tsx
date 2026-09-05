import { NavLink } from "react-router-dom";
import { menuItems } from "../../config/menu";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
  const { user, isLoading } = useAuth();

  // Safe fallback untuk properti user
  const avatar = user?.avatar || "/assets/images/avatar.png";
  const name = user?.username || "User";
  const email = user?.email || "Mail";

  return (
    <>
      {/* Overlay/Backdrop Mobile */}
      {isOpen && <div className="sidebar-overlay show" onClick={onClose} />}

      <aside className={`sidebar-wrapper ${isOpen ? "show" : ""}`} id="sidebar">
        <NavLink to="/dashboard" className="sidebar-brand" onClick={onClose}>
          <i className="bi bi-asterisk" />
          <span>Tarigan Gadai</span>
        </NavLink>

        {/* Render Menu Berdasarkan Section & Items */}
        <div className="flex-grow-1 overflow-y-auto">
          {menuItems.map((group, groupIdx) => (
            <div className="sidebar-menu-section" key={groupIdx}>
              <div className="sidebar-menu-title">{group.section}</div>

              <ul className="sidebar-menu-list">
                {group.items.map((item) => (
                  <li className="sidebar-menu-item" key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `sidebar-menu-link ${isActive ? "active" : ""}`
                      }
                      title={item.label}
                    >
                      <i className={`bi ${item.icon}`} />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="sidebar-profile">
          {isLoading ? (
            /* Tampilan sementara saat fetching data user dari API */
            <div className="sidebar-profile-info">
              <div className="sidebar-profile-name">Loading...</div>
            </div>
          ) : (
            <>
              <img src={avatar} alt={name} className="sidebar-profile-img" />
              <div className="sidebar-profile-info">
                <div className="sidebar-profile-name">{name}</div>
                <div className="sidebar-profile-email">{email}</div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}