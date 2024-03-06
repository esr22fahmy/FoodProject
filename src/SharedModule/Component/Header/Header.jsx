import React from "react";
import styleHeader from "../Header/Header.module.css";

export default function Header({ title, description, imgHom }) {
  return (
    <>
      <div className={`${styleHeader.bgHeaderh} container-fluid`}>
        <div className=" row justify-content-between  px-5  ">
          <div className=" col-12 col-md-5 text-white d-flex align-items-center ">
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>

          <div className=" col-12 col-md-3 pe-5">
            <img className=" img-fluid" src={imgHom} />
          </div>
        </div>
      </div>

     
    </>
  );
}
