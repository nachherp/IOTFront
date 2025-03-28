import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaLayerGroup,
  FaBoxes,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ setActiveComponent }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [rol, setRol] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setRol(localStorage.getItem("rol"));
  }, []);

  const adminMenuItems = [
    { name: "Dashboard", icon: FaTachometerAlt },
    { name: "Trabajadores", icon: FaUsers },
    { name: "Proyectos", icon: FaProjectDiagram },
    { name: "Equipos", icon: FaLayerGroup },
    { name: "Recursos", icon: FaBoxes },
  ];

  const miembroMenuItems = [
    { name: "Dashboard", icon: FaTachometerAlt },
    { name: "Gráficas", icon: FaProjectDiagram },
    { name: "Parcelas", icon: FaLayerGroup },
    
  ];

  const menuItems = rol === "admin" ? adminMenuItems : miembroMenuItems;

  const handleNavigation = (itemName: string) => {
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
    <nav className="w-64 min-h-screen bg-gray-800 text-white shadow-xl flex flex-col py-6">
      <div className="flex flex-col items-center p-4 mb-6 border-b border-gray-700">
        <FaUser className="text-4xl mb-3" />
        <h2 className="font-bold text-xl">
      
        </h2>Cultivos del Sur
        <p className="text-gray-300 text-sm">{localStorage.getItem("email")}</p>
      </div>

      <ul className="flex flex-col flex-grow">
        {menuItems.map((item) => (
          <li key={item.name}>
            <button
              className={`flex items-center text-lg py-2 px-4 rounded transition-colors w-full justify-start ${
                activeItem === item.name
                  ? "bg-blue-500"
                  : "hover:bg-blue-500 hover:bg-opacity-70"
              }`}
              onClick={() => handleNavigation(item.name)}
            >
              <item.icon className="mr-3 text-xl" />
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center mx-4 transition-colors"
      >
        <FaSignOutAlt className="mr-2" /> Cerrar Sesión
      </button>
    </nav>
  );
};

export default Sidebar;
