import React from 'react'
import { Shapes } from 'lucide-react';

const MenuBar = () => {

    return (

        <div className="w-60 bg-green-400 h-full">
            <h1 className="text-3xl head font-semibold px-2 py-4">Chef Kitchen</h1>
            <div className='flex flex-1 px-2 py-3  font-bold font-size-3 gap-20'>
            <Shapes />
            <p>category</p>
            </div>
        </div>
    )
}

export default MenuBar;
