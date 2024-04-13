import React, { useEffect, useState } from 'react'
import styleNav from "../Navbar/Navbar.module.css";
import imgNav from "../../../imgs/user-icon-2098873_1280.png"
export default function Navbar({ DataAdmin }) {
  console.log(DataAdmin);
  let token=localStorage.getItem("tokemAdmin");
  const [CurruntUser,setCurruntUser]=useState(null)
  const getuser=async()=>{
    try{
      let response=await axios.get("https://upskilling-egypt.com:3006/api/v1/Users/currentUser",
      {headers:{Authorization:token}});
   
      setCurruntUser(response?.data);
      // console.log(response?.data);
    }catch(error){
      // console.log(error.message);
    }
  }

  useEffect(()=>{
    getuser();
  },[])
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
                {/* <div className={`${styleNav.imgNav}`}><img src={CurruntUser?.imagePath?`https://upskilling-egypt.com:3006/${CurruntUser?.imagePath}`:<img  src={imgNav} /> } alt="" /></div> */}

                
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
