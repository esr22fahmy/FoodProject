import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

export default function MasterLayout({DataAdmin}) {
  return (
    <>
  
    <div className='  container-fluid'>

    <div className=' row'>

   <div className=' col-2 col-md-2 '>
     <SideBar DataAdmin={DataAdmin}/>
   </div>
   <div className=' col-10  col-md-10 '>
     <Navbar DataAdmin={DataAdmin} />
     {/* <Header  DataAdmin={DataAdmin}/> */}
     <Outlet DataAdmin={DataAdmin}/>
   </div>





</div>


    </div>
    </>
  )
}
