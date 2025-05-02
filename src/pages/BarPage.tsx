import React from 'react';
import user from '/public/login/user-white.webp';


const barList = [
  {nombre: 'Pisco Sour', cantidad: 0, img: '/public/bar/piscoSour.jpeg', tiempo: 0},
  {nombre: 'Macchu Picchu', cantidad: 0, img: '/public/bar/machuPicchu.jpg', tiempo: 0},
  {nombre: 'Negroni', cantidad: 0, img: '/public/bar/negroni.jpg', tiempo: 0},
];


const BarPage: React.FC = () => {

  const barPedido = (barList.map((bar) => (
    <div className='flex gap-5 p-5 m-2 bg-green-400 rounded-xl'>
      <div>
        <img src={bar.img} alt="trago" width="400px" className='rounded-xl' />
      </div>
      <div className='gap-5'>
        <h2 className='text-5xl font-bold text-white'>{bar.nombre}</h2>
        <p className='text-3xl font-bold text-white'>{bar.cantidad}</p>
        <p className='text-3xl font-bold text-white'>{bar.tiempo}</p>
      </div>
    </div>
  )));
  
    return (
      <section className='flex flex-col w-full'>
        <header>
          <div className='flex items-center justify-around w-full py-5 bg-sky-900'>
            <h2 className='font-sans text-5xl font-bold text-white'>Brutal</h2>
            <div className='text-4xl text-white'>|</div>
            <div className='flex items-center gap-4'>
              <img src={user} width="50px" alt="user" />
              <h2 className='text-2xl text-white '>Hola Ellie!</h2>
              <input type="checkbox" />
            </div>
          </div>
          <div className='shadow-xl shadow-black/10'>
            <h1 className='flex items-center justify-center py-4 mb-8 text-5xl font-bold text-sky-800'>Bar Area</h1>
          </div>
        </header>
        <div>
          {barPedido}
        </div>
      </section>
      
    );
  };
  
  export default BarPage;