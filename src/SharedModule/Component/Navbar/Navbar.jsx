import React, { useEffect, useState } from "react";
import axios from "axios";
import styleNav from "../Navbar/Navbar.module.css";
import imgNav from "../../../imgs/user-icon-2098873_1280.png";
export default function NavBar({ DataAdmin }) {
  let token = localStorage.getItem("tokemAdmin");
  const [CurruntUser, setCurruntUser] = useState(null);
  const getuser = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Users/currentUser",
        { headers: { Authorization: token } }
      );

      setCurruntUser(response?.data);
      // console.log(response?.data);
      // setIsLoading(false);
    } catch (error) {
      // console.log(error.message);
    }
  };

  useEffect(() => {
    getuser();
  }, []);
  return (
    <>
    

      <div className={`${styleNav.navCon} container p-3 m-3 rounded-3 `}>
        <div className=" row d-flex  ">
          <div className=" col-md-6">
            <div className="">
            <h1 className={`${styleNav.typeGroup} nav-link   col-md-6  mt-3 `}>
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
           
            </div>
          </div>
       

          <div className=" col-md-6 text-end d-flex  justify-content-end">
          <img
                className={`${styleNav.imgNav}`}
                src={
                  CurruntUser?.imagePath ? (
                    `https://upskilling-egypt.com:3006/${CurruntUser?.imagePath}`
                  ) : (
                    <img className={`${styleNav.imgIconUser}`} src={imgNav} />
                  )
                }
                alt=""
              />
            <a className="nav-link text-black d-flex justify-content-center align-items-center" href="#">
              {DataAdmin?.userName}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
