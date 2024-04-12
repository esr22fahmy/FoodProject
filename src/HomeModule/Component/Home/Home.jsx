import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../SharedModule/Component/Header/Header";
import imgHome from "../../../imgs/eatingHome.png";
import RecipsHeader from "../../../SharedModule/Component/RecipsHeader/RecipsHeader";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home({ DataAdmin }) {
//   const location = useLocation();
// const showToast = location.state && location.state.showToast;
const navigate=useNavigate();


  // useEffect(() => {
  //   if (showToast) {
  //     toast.success("You are logged in successfully!");
  //   }
  // }, [showToast]);


  return (
    <>
      {/* <ToastContainer /> */}
      <Header
        className="  text-white"
        title={`Welcome ${DataAdmin?.userName} !`}
        description={`This is a welcoming screen for the entry of the application , you can now see the options`}
        imgHom={imgHome}
      />

      <RecipsHeader/>

  
    </>
  );
}
