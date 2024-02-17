import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

export default function MasterLayout({DataAdmin}) {
  return (
    <>
  
          <div className=' d-flex'>
          <div className=''>
            <SideBar/>
          </div>
          <div className='w-100'>
            <Navbar DataAdmin={DataAdmin} />
            {/* <Header  DataAdmin={DataAdmin}/> */}
            <Outlet/>
          </div>
       








          </div>
      
    </>
  )
}
