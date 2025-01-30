import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Trabajadores from "./components/Trabajadores";
import Proyectos from "./components/Proyectos";
import Equipos from "./components/Equipos";
import Materiales from "./components/Materiales";
import AgregarTrabajador from "./components/AgregarTrabajadores";
import AgregarProyecto from "./components/AgregarProyecto";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";

import "./App.css";

const App: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [isAddingWorker, setIsAddingWorker] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const renderComponent = () => {
    if (isAddingWorker) {
      return <AgregarTrabajador setIsAddingWorker={setIsAddingWorker} />;
    }

    if (isAddingProject) {
      return <AgregarProyecto setIsAddingProject={setIsAddingProject} />;
    }

    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Trabajadores":
        return <Trabajadores setIsAddingWorker={setIsAddingWorker} />;
      case "Proyectos":
        return <Proyectos setIsAddingProject={setIsAddingProject} />;
      case "Equipos":
        return <Equipos />;
      case "Materiales":
        return <Materiales />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Routes>
      {/* Ruta de Login */}
      <Route path="/login" element={<Login />} />

      {/* Ruta de Registro */}
      <Route path="/register" element={<RegisterForm />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard"
          element={
            <div className="app">
              <Sidebar setActiveComponent={setActiveComponent} />
              <main className="main-content">{renderComponent()}</main>
            </div>
          }
        />
      </Route>

      {/* Redirección a Login por defecto */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
