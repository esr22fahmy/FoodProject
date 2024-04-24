import React from "react";
import styleHeader from "../Header/Header.module.css";

export default function Header({ title, description,description2, imgHom }) {
  return (
    <>
      <div className={`${styleHeader.bgHeaderh} container-fluid py-3`}>
        <div className=" row justify-content-between  px-5  ">
          <div className=" col-12 col-md-6 text-white d-flex align-items-center ">
            <div>
              <h2>{title}</h2>
              <p className="">{description} <br/>{description2}</p>
              

              
            </div>
          </div>

          <div className=" col-12 col-md-6 pe-5 text-end ">
            <img className=" img-fluid" src={imgHom} />
          </div>
        </div>
      </div>

     
    </>
  );
}
