export interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

export interface MenuSection {
  section: string;
  items: MenuItem[];
}

export const menuItems: MenuSection[] = [
  {
    section: "Menu",
    items: [
      { label: "Dashboard", icon: "bi-grid-fill", path: "/dashboard" },
    ],
  },
  {
    section: "Pegadaian",
    items: [
      { label: "Semua Transaksi", icon: "bi-receipt", path: "/transaksi" },
      { label: "Gadai Aktif", icon: "bi-gem", path: "/forms" },
      { label: "Jatuh Tempo", icon: "bi-exclamation-triangle", path: "/buttons" },
      { label: "Lelang", icon: "bi-box-seam", path: "/blank" },
    ],
  },
  {
    section: "Account & Settings",
    items: [
      { label: "Account", icon: "bi-person-circle", path: "/blank" },
      { label: "Site Setting", icon: "bi-gear", path: "/login" },
      { label: "Error 404", icon: "bi-slash-circle", path: "/404" },
    ],
  },
];