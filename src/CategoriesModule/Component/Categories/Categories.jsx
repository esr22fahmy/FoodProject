import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Component/Header/Header";
import imgRes from "../../../imgs/imgRes.png";
import styleCateg from "../Categories/Categories.module.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import ImgNotData from "../../../SharedModule/Component/ImgNotData/ImgNotData";
import imgNoDataImg from "../../../imgs/noData.png";
import ShareCategories from "../../../SharedModule/Component/CategoriesShare/CategoriesShare";
import TagIdShare from "../../../SharedModule/Component/TagIdShare/TagIdShare";

export default function Categories() {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  // modal
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [show, setShow] = useState(false);
  //
  const { isTag, setisTag } = TagIdShare();

  // search fillter
  const [nameSearch, setnameSearch] = useState("");
  const [selectTagId, setselectTagId] = useState(0);
  const [selectCatID, setselectCatID] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  //

  // used custom hook to make the data share
  const { CategoriesList, setCategoriesList, CategoriesShow, getPages } =
    ShareCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // for Modals add

  const handleClose = () => {
    setEditingCategory(null);
    setNewCategoryName("");
    setShow(false);
    setEditMode(false);
  };

  const handleShow = () => setShow(true);
  // end modals

  // fillter
  useEffect(() => {
    CategoriesShow(currentPage, 10);
  }, [currentPage]);
// 
  //  handle Previous button click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // handle Next button click
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // add and updata
  const submitEdit = async (data) => {
    try {
      if (editingCategory) {
        console.log(editingCategory);
        const updatedCategory = { ...editingCategory, name: newCategoryName };
        await axios.put(
          `https://upskilling-egypt.com:443/api/v1/Category/${updatedCategory.id}`,
          updatedCategory,
          {
            headers: {
              Authorization: localStorage.getItem("tokemAdmin"),
            },
          }
        );
        handleClose();
        CategoriesShow();
        toast.success("Category updated successfully");
      }
      // add
      else {
        const newCategory = { name: newCategoryName };
        await axios.post(
          `https://upskilling-egypt.com:443/api/v1/Category/`,
          newCategory,
          {
            headers: {
              Authorization: localStorage.getItem("tokemAdmin"),
            },
          }
        );
        handleClose();
        CategoriesShow();
        toast.success("Category added successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // end  add and updata

  //handle  updata

  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setEditMode(true);

    handleShow();
  };

  // end handle  updata

  // delete
  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`,
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      CategoriesShow();
      toast.success("Category deleted successfully");
    } catch (error) {
      // console.log( error);
      toast.error("Failed to delete category");
    }
  };

  const confirmDelete = () => {
    setShowDeleteModal(false); // Close delete modal
    deleteCategory(categoryIdToDelete); // Delete the category
  };

  const handleDelete = (categoryId) => {
    setShowDeleteModal(true); // Show delete  modal
    setCategoryIdToDelete(categoryId); // Set the category ID to delete
  };

  //end delete

  // for search

  let getNameValue = (input) => {
    setnameSearch(input.target.value);
    CategoriesShow(1, 10, input.target.value);
  };

  return (
    <>
      <ToastContainer />
      <Header
        className="text-white"
        title={`Categories`}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgHom={imgRes}
      />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategory ? "Edit Category" : "Add New Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-5">
          <form onSubmit={handleSubmit(submitEdit)}>
            <input
              className={`form-control`}
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <div className="d-flex justify-content-end mt-5">
              <button className={` btn ${editMode ? "btn-update" : "btn-add"}`}>
                {editMode ? "Update" : "Add"}
              </button>{" "}
            </div>
          </form>
        </Modal.Body>
      </Modal>

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

      <div className=" container-fluid  mt-4 ">
        <div className="   d-flex justify-content-between  px-4 ">
          <div>
            <h5>Categories Table Details</h5>
            <h6 className=" text-muted">You can check all details</h6>
          </div>
          <div>
            <button onClick={handleShow} className={`${styleCateg.btnAdd} btn`}>
              Add New Category
            </button>
          </div>
        </div>
      </div>

      {/* fillter */}
      <div className=" container">
        <div className=" row p-4 ">
          <div className=" col-md-12">
            <div className="form-group has-search">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={getNameValue}
              />
            </div>
          </div>
        </div>
      </div>
      {/*  */}

      <div className=" text-center mt-5 mx-4 ">
        <table className="table ">
          <thead className="">
            <tr className="tableActive  ">
              <th scope="col "> Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
        </table>
        {CategoriesList.length > 0 ? (
          <div className="container-fluid ">
            <table className=" table">
              <tbody>
                {CategoriesList.map((cat, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                    }}
                  >
                    <td>{index}</td>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>
                      {new Date(cat.creationDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>

                    <td>
                      {" "}
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
                              onClick={() => handleEdit(cat)}
                              className="dropdown-item"
                            >
                              <span
                                className={`${styleCateg.btnCursor} text-warning border-0 `}
                              >
                                <i className="fa-solid fa-pen-to-square me-1"></i>
                                Edit
                                
                              </span>{" "}
                            </span>
                          </li>
                          <li>
                            <span
                              onClick={() => handleDelete(rec.id)}
                              className="dropdown-item"
                            >
                              <span
                                className={`${styleCateg.btnCursor}  text-danger border-0 `}
                                onClick={() => handleDelete(cat.id)}
                              >
                                <i className="fa-solid fa-trash me-1"></i>
                                Delete

                              </span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </td>

                    {/* <td>
                      <span
                        className={`${styleCateg.btnCursor} text-warning border-0 `}
                        onClick={() => handleEdit(cat)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </span>{" "}
                      <span className=" mx-2"> </span>
                      <span
                       className={`${styleCateg.btnCursor}  text-danger border-0 `}

                        onClick={() => handleDelete(cat.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>

            <nav aria-label="Page navigation example ">
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
                    className="page-item"
                    onClick={() => CategoriesShow(pageNu, 10)}
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
    </>
  );
}
