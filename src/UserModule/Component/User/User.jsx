import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Component/Header/Header";
import imgRes from "../../../imgs/imgRes.png";
import axios from "axios";
import ImgNotData from "../../../SharedModule/Component/ImgNotData/ImgNotData";
import StyleUser from "../User/User.module.css";
import { Modal, Button } from "react-bootstrap";
import imgNoDataImg from "../../../imgs/noData.png";
import { ToastContainer, toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";
import imgUser from "../../../imgs/person.png";

export default function User() {
  const [ListUser, setListUser] = useState([]);
  const [UserIdToDelete, setUserIdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [show, setShow] = useState(false);
  const [getPages, setgetPages] = useState(0);
  const [nameSearch, setnameSearch] = useState("");
  const [countrySearch, setcountrySearch] = useState("");
  const [EmailSearch, setEmailSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // view
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewedProduct, setViewedProduct] = useState(null);

  //

  // group =>admin or user

  const [selectedGroups, setSelectedGroups] = useState([]);
  //

  const handleViewProduct = (product) => {
    setViewedProduct(product);
    setShowViewModal(true);
  };
  //

  const [currentPage, setCurrentPage] = useState(1);

  let getListUser = async (pageNu, pageSize, name, email, country, groups) => {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Users/",
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
          params: {
            pageNumber: pageNu,
            pageSize: pageSize,
            userName: name,
            email: email,
            country: country,
            groups: groups,
          },
        }
      );
      setLoading(false);
      console.log(data)
      const totalPages = data.totalNumberOfPages;
      const pagesArray = Array.from(Array(totalPages).keys()).map(
        (num) => num + 1
      );
      setgetPages(pagesArray);
      setListUser(data.data);
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListUser(1, 10);
  }, []);

  const deleteUser = async (UseryId) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${UseryId}`,
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      getListUser();
      console.log(ListUser)
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete User");
    }
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    deleteUser(UserIdToDelete);
  };

  const handleDelete = (UseryId) => {
    setShowDeleteModal(true);
    setUserIdToDelete(UseryId);
  };

  // fillter
  let getNameValue = (input) => {
    setnameSearch(input.target.value);
    getListUser(1, 10, input.target.value, EmailSearch, countrySearch);
  };

  let getEmailValue = (input) => {
    setEmailSearch(input.target.value);
    getListUser(1, 10, nameSearch, input.target.value, countrySearch);
  };

  let getCountyValue = (input) => {
    setcountrySearch(input.target.value);
    getListUser(1, 10, nameSearch, EmailSearch, input.target.value);
  };

  let getGroupsValue = (input) => {
    let selectedGroupsValue = [parseInt(input.target.value)];
    setSelectedGroups(selectedGroupsValue);
    getListUser(
      1,
      10,
      nameSearch,
      EmailSearch,
      countrySearch,
      selectedGroupsValue
    );
  };

  // pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      getListUser(
        currentPage - 1,
        10,
        nameSearch,
        EmailSearch,
        countrySearch,
        selectedGroups
      );
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    getListUser(
      currentPage + 1,
      10,
      nameSearch,
      EmailSearch,
      countrySearch,
      selectedGroups
    );
  };


 

  return (
    <>
      <ToastContainer />
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
      <Header
        className="  text-white"
        title={`Users List`}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgHom={imgRes}
      />
      <div className=" container-fluid my-5  ">
        <div className=" mx-4">
          <h4> Users Table Details</h4>
          <p> You can check all details</p>
        </div>
      </div>
      <div className=" container">
        <div className=" row p-4 ">
          <div className=" col-md-3">
            <div className="form-group has-search">
              <input
                type="text"
                className="form-control"
                placeholder="Search For Name"
                onChange={getNameValue}
              />
            </div>
          </div>
          <div className=" col-md-3">
            <div className="form-group has-search">
              <input
                type="text"
                className="form-control"
                placeholder="Search For Email"
                onChange={getEmailValue}
              />
            </div>
          </div>
          <div className=" col-md-3">
            <div className="form-group has-search">
              <input
                type="text"
                className="form-control"
                placeholder="Search For Country"
                onChange={getCountyValue}
              />
            </div>
          </div>
          <div className="col-md-2">
            <select
              name=""
              id=""
              className="form-select  py-2"
              onChange={getGroupsValue}
            >
              <option value="" selected>
                Search by group
              </option>
              <option value="1">Admin</option>
              <option value="2"> User</option>
            </select>
          </div>
        </div>
      </div>
      <div className=" text-center mt-5 mx-4 ">
        {loading ? (
          <div className="  d-flex justify-content-center align-items-center">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : ListUser.length > 0 ? (
          <div>

<div className="container-fluid table ">
            <table className={`${StyleUser.bgTable}`}>
              <thead className="">
                <tr className="tableActive   ">
                  <th scope="col "> Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Email</th>
                  <th scope="col">Country</th>
                  <th scope="col">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {ListUser.map((user, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                    }}
                  >
                    <td>{user.userName}</td>
                    <td className={`${StyleUser.conImg}`}>
                      {user.imagePath ? (
                        <img
                          className={`${StyleUser.imgUser}`}
                          src={`https://upskilling-egypt.com:3006/${user.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className={`${StyleUser.imgUserReplace}`}
                          src={imgUser}
                          alt=""
                        />
                      )}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.country}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                      <div className="btn-group">
                        <span
                          className="   "
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-ellipsis"></i>{" "}
                        </span>
                        <ul className="dropdown-menu">
                          <li>
                            <span
                              onClick={() => handleDelete(user.id)}
                              className="dropdown-item"
                            >
                              <span
                                className={`${StyleUser.btnCursor}   border-0  px-2`}
                              >
                                <i className="fa-solid fa-trash text-danger me-1"></i>
                                Delete
                              </span>{" "}
                            </span>
                          </li>

                          <li>
                            <span
                              className="dropdown-item"
                              onClick={() => handleViewProduct(user)}
                            >
                              <span
                                className={`${StyleUser.btnCursor} border-0 px-2`}
                              >
                                <i className="fa-solid fa-street-view text-success me-1"></i>
                                View
                              </span>{" "}
                            </span>
                          </li>
                        </ul>
                      </div>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          


         
          </div>

            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={handlePreviousPage}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>

                {getPages.map((pageNu, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === pageNu ? "active" : ""
                    }`}
                    onClick={() => {
                      setCurrentPage(pageNu);
                      getListUser(
                        pageNu,
                        10,
                        nameSearch,
                        EmailSearch,
                        countrySearch,
                        selectedGroups
                      );
                    }}
                  >
                    <a className="page-link">{pageNu}</a>
                  </li>
                ))}

                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={handleNextPage}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
         


          
        ) : (
          <>
            <ImgNotData />
          </>
        )}
      </div>

      {/* modal for view */}

      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewedProduct && (
            <>
              <div className=" text-center ">
                {viewedProduct.imagePath ? (
                  <img
                    className="img-fluid w-75 rounded-3"
                    src={`https://upskilling-egypt.com/${viewedProduct.imagePath}`}
                    alt=""
                  />
                ) : (
                  <img
                    className="img-fluid w-50 rounded-3"
                    src={imgUser}
                    alt=""
                  />
                )}

                <div className=" text-center mt-2">
                  <h4 className=" text-success">{viewedProduct.userName}</h4>
                  <h6>{viewedProduct.email}</h6>
                  <p>{viewedProduct.country}</p>
                  <p>{viewedProduct.phoneNumber}</p>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
