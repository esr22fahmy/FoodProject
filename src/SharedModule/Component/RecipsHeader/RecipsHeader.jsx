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

<div className={`${styleHome.space} container-fluid my-5    `} >
      <div className={`${styleHome.bgHome} row mx-4 rounded-4   `}>

        <div className="  col-md-6   ">
          <h4>Fill the <span className={`${styleHome.differentColorCon } `} >Recipes</span> !</h4>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>


        </div>

        <div className="  col-md-6  text-end ">

          <button onClick={navigateToRecipes} className={`${styleHome.btnHome} btn  px-5 py-2`}>  Fill Recipes  
          <i className="fa-solid fa-arrow-right ms-2"></i>
          
            </button>


        </div>
         
         
        </div>




      </div>
      
    </>
  )
}
