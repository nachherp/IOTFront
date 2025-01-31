import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import "../assets/Sidebar.css";
import {
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaLayerGroup,
  FaBoxes,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

interface SidebarProps {
  setActiveComponent: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [rol, setRol] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    setRol(storedRol);
  }, []);

  const menuItemsAdmin = [
    { name: "Dashboard", icon: FaTachometerAlt },
    { name: "Trabajadores", icon: FaUsers },
    { name: "Proyectos", icon: FaProjectDiagram },
    { name: "Equipos", icon: FaLayerGroup },
    { name: "Recursos", icon: FaBoxes },
  ];

  const menuItemsMiembro = [
    { name: "Dashboard", icon: FaTachometerAlt },
    { name: "Mis Tareas", icon: FaProjectDiagram },
    { name: "Mi Equipo", icon: FaLayerGroup },
    { name: "Recursos", icon: FaBoxes },
  ];

  const menuItems = rol === "admin" ? menuItemsAdmin : menuItemsMiembro;

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    setActiveComponent(itemName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className={`${styles.sidebar} col-md-3 col-lg-2 d-md-block sidebar`}>
      <div className={styles.userSection}>
        <FaUser className={styles.userIcon} />
        <div className={styles.userInfo}>
          <h3>{rol === "admin" ? "Administrador" : "Miembro"}</h3>
          <p>{localStorage.getItem("email")}</p>
        </div>
      </div>

      <div className="position-sticky">
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.name}>
              <button
                onClick={() => handleItemClick(item.name)}
                className={`nav-link d-flex align-items-center ${
                  activeItem === item.name ? styles.active : styles.inactive
                }`}
              >
                <item.icon className="me-3" />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleLogout} className="btn btn-danger mt-4" style={{ width: "80%", margin: "0 auto", display: "block" }}>
        <FaSignOutAlt className="me-2" /> Cerrar Sesión
      </button>
    </nav>
  );
};

export default Sidebar;
