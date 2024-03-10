import React from "react";
import styleNav from "../Navbar/Navbar.module.css";
import imgNav from "../../../imgs/user-icon-2098873_1280.png"
export default function Navbar({ DataAdmin }) {
  console.log(DataAdmin);
  return (
    <div className="  container">
      <div className=" row ">
        <div className=" col-12 col-md-12">
          <nav
            className={`${styleNav.navCon} navbar navbar-expand-lg my-4 rounded-4`}
          >
            <div className=" container-fluid">
              <div className="row  px-3  ">
              <h1 className={`${styleNav.typeGroup} nav-link   col-md-6 `}>
                {" "}
                {DataAdmin?.userGroup == "SuperAdmin" ? (
                  <h5 className={`${styleNav.group}`}>
                    Welcome Admin{" "}
                    <i className="fa-solid fa-heart text-danger"></i>
                  </h5>
                ) : (
                  <h5>
                    Welcome User{" "}
                    <i className="fa-solid fa-heart text-danger"></i>
                  </h5>
                )}
              </h1>

              <h1 className="nav-link text-black col-md-6 text-end" >
                <img className={`${styleNav.imgNav}`} src={imgNav} />
                {" "}
                {DataAdmin?.userName}
              </h1>







              </div>
            
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
