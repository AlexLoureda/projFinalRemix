// routes/app.tsx
import { Outlet } from "@remix-run/react";  // Importamos el Outlet
import Header from "../components/navigation/Header"; // Si no lo tienes, ajusta la ruta según corresponda

export default function AppLayout() {
  return (
    <>
      <Header />
      <div className="content-container">
        <Outlet />  {/* Aquí se cargarán las vistas hijas */}
      </div>
    </>
  );
}
