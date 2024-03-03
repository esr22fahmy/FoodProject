import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Component/Header/Header";
import imgRes from "../../../imgs/imgRes.png";
import axios from "axios";
import ImgNotData from "../../../SharedModule/Component/ImgNotData/ImgNotData";
import StyleUser from "../User/User.module.css";
import { Modal, Button } from "react-bootstrap";
import imgNoDataImg from "../../../imgs/noData.png";
import { ToastContainer, toast } from "react-toastify";

export default function User() {
  const [ListUser, setListUser] = useState([]);
  const [UserIdToDelete, setUserIdToDelete] = useState(null);
  // modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [show, setShow] = useState(false);

  let getListUser = async () => {
    try {
      let { data } = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );

      // console.log(data)
      setListUser(data.data);
      // console.log(ListUser)
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getListUser();
  }, []);

 // delete
 const deleteUser = async (UseryId) => {
  try {
    await axios.delete(
      `https://upskilling-egypt.com:443/api/v1/Users/${UseryId}`,
      {
        headers: {
          Authorization: localStorage.getItem("tokemAdmin"),
        },
      }
    );
    getListUser();
    toast.success("User deleted successfully");
  } catch (error) {
    // console.log( error);
    toast.error("Failed to delete User");
  }
};

  // delete item
  const confirmDelete = () => {
    setShowDeleteModal(false);
    deleteUser(UserIdToDelete);
  };

  // when i onclick delete show me modal delete
  const handleDelete = (UseryId) => {
    setShowDeleteModal(true);
    setUserIdToDelete(UseryId);
  };

  return (
    <>

<ToastContainer />

      {/* modal for delete */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className=" ">
          <div className=" text-center">
            <img src={imgNoDataImg} />

            <h5 className=" mt-3">Delete This Category ?</h5>
            <h6>
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}
      <Header
        className="  text-white"
        title={`Users List`}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgHom={imgRes}
      />{" "}
      <div className=" container-fluid my-5  ">
        <div className=" mx-4">
          <h4> Users Table Details</h4>
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
                      {user.imagePath ? (
                        <img
                          className={`${StyleUser.imgUser}`}
                          src={`https://upskilling-egypt.com/${user.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <p>Not Img</p>
                      )}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.country}</td>
                    <td>{user.phoneNumber}</td>

                    <td>
                      {/* <span
                        className={`${StyleUser.btnCursor} text-warning border-0 `}
                        onClick={() => handleEdit(user)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </span>{" "} */}
                      <span className=" mx-2"> </span>
                      <span
                        className={`${StyleUser.btnCursor}  text-danger border-0 `}
                        onClick={() => handleDelete(user.id)}
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
