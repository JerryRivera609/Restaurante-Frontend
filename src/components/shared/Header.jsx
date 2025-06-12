import React from 'react';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
    return (
        <header className='bg-[#1a1a1a] flex h-20 px-8 items-center justify-between'>
            <div className='flex items-center gap-2'>
                <MdOutlineRestaurantMenu className='text-white w-7 h-7' />
                <h1 className='text-2xl text-white'>Brutal</h1>
            </div>
            
            <div className='flex items-center gap-2 text-white '>
                <FaRegUserCircle className='w-10 h-10 text-white' />
                <div>
                    <h2 className='font-bold'>Jerry Rivera</h2>
                    <p className='text-[15px]'>Admin</p>
                </div>
            </div>
        </header>
    );
};

export default Header;