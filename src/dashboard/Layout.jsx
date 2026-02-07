import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuBar from './MenuBar'
import Head from './Head'


const Layout = () => {
  return (
    <div className="flex h-screen w-full">
     
      <MenuBar />

  
      <div className="flex flex-col w-full">
       
        <Head />

    
        <div className="flex-1 p-4 bg-gray-800 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
