import React from 'react'
import { useNavigate } from "react-router-dom";
import styleHome from "../../../HomeModule/Component/Home/Home.module.css";

export default function RecipsHeader() {

    const navigate = useNavigate();

    let navigateToRecipes =()=>{
       navigate("recipes")
     }
  return (
    <>

<div className={`${styleHome.space} container-fluid my-5   `} >
      <div className={`${styleHome.bgHome} row mx-4 rounded-4    justify-content-center align-items-center  `}>

        <div className=" col-12 col-sm-12 col-md-12 col-lg-6  ">
          <h4>Fill the <span className={`${styleHome.differentColorCon } `} >Recipes</span> !</h4>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>


        </div>

        <div className=" col-12 col-sm-12 col-md-12  col-lg-6  text-end ">

          <button onClick={navigateToRecipes} className={`${styleHome.btnHome} btn  `}>  Fill Recipes  
          <i className="fa-solid fa-arrow-right ms-2"></i>
          
            </button>


        </div>
         
         
        </div>




      </div>
      
    </>
  )
}
