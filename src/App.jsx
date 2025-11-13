import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import SiteLayout from "./layouts/SiteLayout.jsx"; 
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import OurTeam from "./pages/OurTeam.jsx";
import Reservations from "./pages/Reservation.jsx";
import AnimatedPage from "./components/common/AnimatedPage.jsx";

export default function App() {
  const location = useLocation();

  return (
    <SiteLayout>
      {/* AnimatePresence permite animaciones al montar y desmontar rutas */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          />
          <Route
            path="/Services"
            element={
              <AnimatedPage>
                <Services />
              </AnimatedPage>
            }
          />
          <Route
            path="/About"
            element={
              <AnimatedPage>
                <About />
              </AnimatedPage>
            }
          />
          <Route
            path="/Reservations"
            element={
              <AnimatedPage>
                <Reservations />
              </AnimatedPage>
            }
          />
          <Route
            path="/OurTeam"
            element={
              <AnimatedPage>
                <OurTeam />
              </AnimatedPage>
            }
          />
          <Route
            path="/Contact"
            element={
              <AnimatedPage>
                <Contact />
              </AnimatedPage>
            }
          />
        </Routes>
      </AnimatePresence>
    </SiteLayout>
  );
}
