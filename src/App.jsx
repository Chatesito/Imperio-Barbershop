import { Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout.jsx"; 
import Contacto from "./pages/Contact.jsx";

function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="text-neutral-300 mt-2">Bienvenido a Imperio Barbershop.</p>
    </section>
  )
}

function Servicios() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">Services and Prices</h1>
    </section>
  )
}

function SobreNosotros() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">About Us</h1>
    </section>
  )
}

function Reservaciones() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">Reservations</h1>
    </section>
  )
}

function Equipo() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">Our Team</h1>
    </section>
  )
}

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/reservaciones" element={<Reservaciones />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </SiteLayout>
  );
}