import { Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import About from"./pages/About";

function Reservations() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">Reservaciones</h1>
    </section>
  )
}

function OurTeam() {
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
        <Route path="/Services" element={<Services />} />
        <Route path="/About" element={<About />} />
        <Route path="/Reservations" element={<Reservations />} />
        <Route path="/OurTeam" element={<OurTeam />} />
        <Route path="/Contact" element={<Contacto />} />
      </Routes>
    </SiteLayout>
  );
}