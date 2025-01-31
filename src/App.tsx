import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import MiembroDashboard from "./components/MiembroDashboard";
import Trabajadores from "./components/Trabajadores";
import Proyectos from "./components/Proyectos";
import Equipos from "./components/Equipos";
import Materiales from "./components/RecursosMiembro";
import MisTareas from "./components/MisTareas";
import MiembroEquipo from "./components/MiembroEquipo";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import Recursos from "./components/Recursos"
import "./App.css";

const AdminLayout: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      
      case "Trabajadores":
        return <Trabajadores />;
      case "Proyectos":
        return <Proyectos />;
      case "Equipos":
        return <Equipos />;
        case "Recursos":
          return <Recursos />;
      
    }
  };

  return (
    <div className="app">
      <Sidebar setActiveComponent={setActiveComponent} />
      <main className="main-content">{renderComponent()}</main>
    </div>
  );
};

const MiembroLayout: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Mis Tareas":
        return <MisTareas />;
      case "Mi Equipo":
        return <MiembroEquipo/>;
        case "Recursos":
          return <Materiales/>
    
    }
  };

  return (
    <div className="app">
      <Sidebar setActiveComponent={setActiveComponent} />
      <main className="main-content">{renderComponent()}</main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard" element={<AdminLayout />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={["miembro"]} />}>
        <Route path="/miembro-dashboard" element={<MiembroLayout />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
