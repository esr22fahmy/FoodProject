import React, { useEffect } from "react";
import Header from "../../../SharedModule/Component/Header/Header";
import imgRes from "../../../imgs/imgRes.png";
import styleCateg from "../Categories/Categories.module.css";
import { useState } from "react";
import axios from "axios";
import ImgNotData from "../../../SharedModule/Component/ImgNotData/ImgNotData";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export default function Categories() {
  const [CategoriesList, setCategoriesList] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  // for Modals

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setEditingCategory(null);
    setNewCategoryName("");
    setShow(false);
  };

  const handleShow = () => setShow(true);
  // end modals


  // delete

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);


  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // updata and add
  let submitEdit = async (data) => {
    try {
      if (editingCategory) {
        const updatedCategory = { ...editingCategory, name: newCategoryName };
        const response = await axios.put(
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
      } else {
        const newCategory = { name: newCategoryName };
        const response = await axios.post(
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
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  // show Categories
  let CategoriesShow = async () => {
    try {
      let dtaCategories = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      setCategoriesList(dtaCategories.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //

  const handleDeleteConfirm = async ({categoryId}) => {
    try {
      await axios.delete("https://upskilling-egypt.com:443/api/v1/Category/${categoryId}", {
        headers: {
          Authorization: localStorage.getItem("tokemAdmin"),
        },
      });

      console.log("Category deleted");
      handleClose(); 
    } catch (error) {
      console.error("Failed to delete category:", error);
      
    }
  };

  useEffect(() => {
    CategoriesShow();
  }, []);

  // this for updata
  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    handleShow();
  };
  // this for add new category
  const handleAddNew = () => {
    setEditingCategory(null);
    setNewCategoryName("");
    handleShow();
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
              <button className={`${styleCateg.btnAdd} btn`}>
                {editingCategory ? "Save" : "Add"}
              </button>{" "}
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* modal for delete */}

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleDeleteConfirm}>
            Yes
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
            <button
              onClick={handleAddNew}
              className={`${styleCateg.btnAdd} btn`}
            >
              Add New Category
            </button>
          </div>
        </div>
      </div>

      <div className=" text-center mt-5 mx-4 ">
        <table className="table ">
          <thead className="">
            <tr className="table-active  ">
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
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{cat.name}</td>
                    <td>{cat.id}</td>
                    <td>
                      {new Date(cat.creationDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(cat)}
                      >
                        Update
                      </button>{" "}
                      <span className=" mx-2"> </span>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleShowDeleteModal(cat)}

                      >
                        Delete
                      </button>
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
