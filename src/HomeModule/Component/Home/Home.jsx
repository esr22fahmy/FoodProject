import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../SharedModule/Component/Header/Header";
import imgHome from "../../../imgs/eatingHome.png"

export default function Home({DataAdmin}) {
  return (
    <>
      <ToastContainer />
      <Header className="  text-white" title={`Welcome ${DataAdmin?.userName} !`} 
      description={`This is a welcoming screen for the entry of the application , you can now see the options`}  
      imgHom ={imgHome}
      
      />
    </>
  );
}
