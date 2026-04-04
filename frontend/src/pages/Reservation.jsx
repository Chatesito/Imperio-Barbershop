import React from "react";
import HeroSection from "../components/reservations/HeroSection.jsx";
import DecorativeLine from "../components/reservations/DecorativeLine.jsx";
import ReservationForm from "../components/reservations/ReservationForm.jsx";
import ReservationAside from "../components/reservations/ReservationAside.jsx";

const Reservation = () => (
  <main className="w-full bg-white text-neutral-900">
    <HeroSection />
    <DecorativeLine />

    <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
      <ReservationForm />
      <ReservationAside />
    </section>
  </main>
);

export default Reservation;