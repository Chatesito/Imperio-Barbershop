import React from 'react';
import ImgFondoSeccion from '../assets/images/barbero-cortando-cabello.png';

const Contact = () => {
  return (
    <>
      <section
        className="w-full h-[calc(100vh-6.5rem)] bg-cover bg-center flex flex-col items-center justify-center
        shadow-[inset_0_-110px_30px_0_rgba(0,0,0,0.45)]
        "
        style={{ backgroundImage: `url(${ImgFondoSeccion})` }}
      >
        <h2 className="w-[43rem] text-[3rem] font-extrabold text-center uppercase leading-tight">
          Experimente el lujo de los servicios de barbero a domicilio
        </h2>
      </section>
      <div className='w-full max-w-7xl mx-auto px-7 py-12 flex flex-col items-center justify-center'> 
        <h2 className='text-[#C5A253] text-[5rem] font-karantina font-extrabold uppercase'> 
            ¿Dónde estamos ubicados? 
        </h2>
      </div>
    </>
  );
};

export default Contact;