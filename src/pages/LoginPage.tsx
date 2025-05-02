import React from 'react';
import user from '/public/login/user.png';
import password from '/public/login/password.png';

const LoginPage: React.FC = () => {
    return (
      <section className='flex flex-col items-center justify-center h-[100vh] w-full'>
        <div>
          <h3 className='flex items-center justify-center text-xl text-sky-800'>Welcome to</h3>
          <h1 className='flex items-center justify-center mb-8 text-5xl font-bold text-sky-800'>Brutal</h1>
        </div>
        <div className='w-full px-[50px]'>
          <div className='flex flex-col gap-5 '>
            <div className='relative w-full max-w-sm'>
              <img src={user} alt="user" className='absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2'/>
              <input type="text" placeholder='User' className='w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-800' />  
            </div>
            <div className='relative w-full max-w-sm'>
              <img src={password} alt="user" className='absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2'/>
              <input type="password" placeholder='Password' className='w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-800' />  
            </div>
          </div>
          <div className='flex gap-1 pt-1.5 items-center'>
            <input type="checkbox"/>
            <p className='text-xl text-sky-900'>Remember me</p>
          </div>
          <div className='flex flex-col text-center '>
            <button className='w-full p-2 mt-10 text-2xl text-white rounded-full border-1 bg-gradient-to-l from-sky-800 to-gray-500'>LOGIN</button>
            <button className='text-sky-800'>Forget Password</button>
          </div>
        </div>
        <div></div>
      </section>
    );
  };
  
  export default LoginPage;