import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Component/Header/Header";
import imgRes from "../../../imgs/imgRes.png";
import axios from "axios";
import ImgNotData from "../../../SharedModule/Component/ImgNotData/ImgNotData";
import StyleUser from "../User/User.module.css"

import { ToastContainer, toast } from "react-toastify";

export default function User() {

  const [ListUser, setListUser] = useState([])


 let getListUser =async()=>{

  try {

    let {data} = await axios.get("https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1",
    {
      headers: {
        Authorization: localStorage.getItem("tokemAdmin"),
      },
    }
    )

    console.log(data.data)
    setListUser(data.data)
    console.log(ListUser)

   
    
  } catch (error) {
    console.log(error.message)
    toast.error(error.message);


  }


 }


 useEffect(() => {

  getListUser()
 
 }, [])








  return (
    <>
          <ToastContainer />

      <Header
        className="  text-white"
        title={`Users List`}
        description={`You can now add your items that any user can order it from the Application and you can edit`}

        imgHom={imgRes}
      />{" "}

      <div className=" container-fluid my-5  ">

        <div className=" mx-4">

        <h4>  Users Table Details</h4>
          <p> You can check all details</p>

        </div>

     
      </div>

      {/* table */}


      <div className=" text-center mt-5 mx-4 ">
        <table className="table ">
          <thead className="">
            <tr className="tableActive  ">
              <th scope="col "> Name</th>
              <th scope="col">Image</th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">Phone Number</th>

            </tr>
          </thead>
        </table>
        {ListUser.length > 0 ? (
          <div className="container-fluid ">
            <table className=" table">
              <tbody>
                {ListUser.map((user, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                    }}
                  >
                    {/* <td>{index}</td> */}
                   
                    <td>{user.userName}</td>
                    <td className={`${StyleUser.conImg}`}>
                      {user.imagePath?<img className={`${StyleUser.imgUser}`} src={`https://upskilling-egypt.com/${user.imagePath}`} alt=""/>:<p>Not Img</p>}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.country}</td>
                    <td>{user.phoneNumber}</td>

                    <td>
                      <span
                        className={`${StyleUser.btnCursor} text-warning border-0 `}
                        onClick={() => handleEdit(cat)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </span>{" "}
                      <span className=" mx-2"> </span>
                      <span
                       className={`${StyleUser.btnCursor}  text-danger border-0 `}

                        onClick={() => handleDelete(cat.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <ImgNotData />
          </>
        )}
      </div>
    </>
  );
}
