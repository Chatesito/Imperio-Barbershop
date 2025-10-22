import { Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout.jsx";
import Home from "./pages/Home.jsx";

function Servicios() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">Servicios y Precios</h1>
    </section>
  )
}

function SobreNosotros() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">Sobre Nosotros</h1>
    </section>
  )
}

function Reservaciones() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">Reservaciones</h1>
    </section>
  )
}

function Equipo() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">Nuestro Equipo</h1>
    </section>
  )
}

function Contacto() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">Contacto</h1>
    </section>
  )
}

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Servicios />} />
        <Route path="/About" element={<SobreNosotros />} />
        <Route path="/Reservations" element={<Reservaciones />} />
        <Route path="/OurTeam" element={<Equipo />} />
        <Route path="/Contect" element={<Contacto />} />
      </Routes>
    </SiteLayout>
  );
}