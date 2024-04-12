import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Component/Header/Header";
import imgRes from "../../../imgs/imgRes.png";
import styleRecipes from "../Recipes/Recipes.module.css";
import axios from "axios";
import ImgNotData from "../../../SharedModule/Component/ImgNotData/ImgNotData";
import DeleteModal from "../../../SharedModule/Component/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ShareRecipes from "../../../SharedModule/Component/ShareRecipes/ShareRecipes";
import ShareCategories from "../../../SharedModule/Component/CategoriesShare/CategoriesShare";
import { useForm } from "react-hook-form";
import TagIdShare from "../../../SharedModule/Component/TagIdShare/TagIdShare";
import imgError from "../../../imgs/false-2061131_1280.png";
import { BallTriangle } from "react-loader-spinner";
import { RotatingLines } from "react-loader-spinner";

export default function Recipes() {
  const [loadingBtn, setLoadingBtn] = useState(false);

  // console.log(JSON.parse(localStorage.getItem("dataLogin")));
  let loginData = JSON.parse(localStorage.getItem("dataLogin"));
  //
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [show, setShow] = useState(false);
  const [RecipeIdToDelete, setRecipeIdIdToDelete] = useState(null);
  const [RecipeWord, setRecipeWord] = useState("Recipe");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // modal for view

  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  //

  // used custom hook to make the data share
  const { ListRecipes, setListRecipes, getRecipes, getPages } = ShareRecipes();

  // console.log(ListRecipes);
  const { CategoriesList } = ShareCategories();
  // tagId
  const { isTag, setisTag } = TagIdShare();
  // search fillter
  const [nameSearch, setnameSearch] = useState("");
  const [selectTagId, setselectTagId] = useState(0);
  const [selectCatID, setselectCatID] = useState(0);
  //
  const navigate = useNavigate();
  //

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [recipeIdToAddToFavorites, setRecipeIdToAddToFavorites] =
    useState(null);

  const favoritesItem = async (RecipeId) => {
    setLoadingBtn(true);

    try {
      let favor = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/`,
        { recipeId: RecipeId },
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      console.log(favor);
      toast.success("Add favorite Recipesuccessfully");
    } catch (error) {
      toast.error("Failed to add favorite Recipe ");
    }
    setLoadingBtn(false);
  };
  // end favorites

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    getRecipes(currentPage, 10)
      .then(() => setLoading(false)) // Set loading state to false after fetching data
      .catch(() => setLoading(false)); // Set loading state to false if there's an error
  }, [currentPage]);

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

  // delete

  const deleteRecipe = async (RecipeId) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${RecipeId}`,
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      console.log(deleteRecipe);
      getRecipes();
      toast.success("Recipe deleted successfully");
    } catch (error) {
      toast.error("Failed to delete Recipe");
    }
  };

  // delete item
  const confirmDelete = () => {
    setShowDeleteModal(false);
    deleteRecipe(RecipeIdToDelete);
  };

  // when i onclick delete show me modal delete
  const handleDelete = (RecipeId) => {
    setShowDeleteModal(true);
    setRecipeIdIdToDelete(RecipeId);
  };

  const handleEdit = (recipe) => {
    navigate(`/dashboard/recipesData/${recipe.id}`, { state: { recipe } });
  };

  const handleAddNewItem = () => {
    // i put null because i put :/id in app
    navigate("/dashboard/recipesData/null");
  };

  // for search

  let getNameValue = (input) => {
    setnameSearch(input.target.value);
    getRecipes(1, 10, input.target.value, selectTagId, selectCatID);
  };

  // tag
  let getTag = (tag) => {
    setselectTagId(tag.target.value);
    getRecipes(1, 10, nameSearch, tag.target.value, selectCatID);
  };

  // Categories
  let getCate = (cat) => {
    const categoryId = cat.target.value;
    setselectCatID(categoryId);
    getRecipes(1, 10, nameSearch, selectTagId, categoryId);
  };
  //

  // ...

  const handleAddToFavorites = (recipeId) => {
    setRecipeIdToAddToFavorites(recipeId);
    setShowConfirmationModal(true);
  };

  const confirmAddToFavorites = async () => {
    const getFav = localStorage.getItem("favRecipes");
    let favList = [];
    try {
      await favoritesItem(recipeIdToAddToFavorites);
      let getItem = await axios.get(
        `https://upskilling-egypt.com/api/v1/Recipe/${recipeIdToAddToFavorites}`,
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      if (getFav != null) {
        favList.push(...JSON.parse(getFav));
      }
      favList.push(getItem.data);
      localStorage.setItem("favRecipes", JSON.stringify(favList));
      setShowConfirmationModal(false);
    } catch (error) {
      toast.error("Failed to add recipe to favorites");
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      {/* modal for delete */}
      <DeleteModal
        RecipeWord={RecipeWord}
        show={show}
        confirmDelete={confirmDelete}
        deleteRecipe={deleteRecipe}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      {/*  */}
      <Header
        className="  text-white"
        title={`Recipes Items`}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgHom={imgRes}
      />{" "}
      {/*  */}
      <div className=" container-fluid  mt-4 ">
        <div className="   d-flex justify-content-between  px-4 ">
          <div>
            <h5> Recipe Table Details</h5>
            <h6 className=" text-muted">You can check all details</h6>
          </div>
          <div>
            {loginData?.userGroup == "SuperAdmin" ? (
              <button
                onClick={handleAddNewItem}
                className={`${styleRecipes.btnAdd} btn px-5 py-2`}
              >
                Add New Item
              </button>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
      {/* fillter */}
      <div className=" container">
        <div className=" row p-4 ">
          <div className=" col-4 col-md-6">
            <div className="form-group has-search">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={getNameValue}
              />
            </div>
          </div>
          {/*Tag  */}
          <div className="col-4 col-md-3">
            <div className="input-group mb-3">
              <select
                className={`${styleRecipes.inputs} form-select`}
                onChange={getTag}
              >
                <option value="">Search by Tag</option>
                {isTag?.map((rec, index) => (
                  <option key={index} value={rec.id}>
                    {rec.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Categories */}
          <div className="col-4 col-md-3">
            <div className="input-group mb-3">
              <select
                className={`${styleRecipes.inputs} form-select`}
                onChange={getCate}
              >
                <option value="">Search by Categories</option>
                {CategoriesList?.map((rec, index) => (
                  <option key={index} value={rec.id}>
                    {rec.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/* table */}
      <div className=" text-center mt-5 mx-4 ">
        <table className="table">
          <thead className="">
            <tr className="tableActive">
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Tag</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <td
                colSpan="7"
                className="text-center"
                style={{ verticalAlign: "middle" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
              </td>
            ) : ListRecipes.length > 0 ? (
              ListRecipes.map((rec, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                  }}
                >
                  <td>{rec.name}</td>
                  <td className={`${styleRecipes.conImg}`}>
                    {rec.imagePath ? (
                      <img
                        className={`${styleRecipes.imgrec}`}
                        src={`https://upskilling-egypt.com:3006/${rec.imagePath}`}
                        alt=""
                      />
                    ) : (
                      <img
                        className={`${styleRecipes.imgrec}`}
                        src={imgError}
                        alt=""
                      />
                    )}
                  </td>
                  <td>{rec.price}</td>
                  <td>{rec.description}</td>
                  <td>{rec.id}</td>
                  <td>{rec.category[0]?.name}</td>
                  <td>
                    {loginData?.userGroup === "SuperAdmin" ? (
                      <div className="btn-group">
                        <span
                          className=""
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </span>
                        <ul className="dropdown-menu">
                          <li>
                            <span
                              onClick={() => handleEdit(rec)}
                              className="dropdown-item"
                            >
                              <span
                                className={`${styleRecipes.btnCursor} border-0 px-2`}
                              >
                                <i className="fa-solid fa-pen-to-square text-warning me-1"></i>
                                Edit
                              </span>
                            </span>
                          </li>
                          <li>
                            <span
                              onClick={() => handleDelete(rec.id)}
                              className="dropdown-item"
                            >
                              <span
                                className={`${styleRecipes.btnCursor} border-0 px-2`}
                              >
                                <i className="fa-solid fa-trash text-danger me-1"></i>
                                Delete
                              </span>
                            </span>
                          </li>
                          <li>
                            <span
                              className="dropdown-item"
                              onClick={() => handleViewProduct(rec)}
                            >
                              <span
                                className={`${styleRecipes.btnCursor} border-0 px-2`}
                              >
                                <i className="fa-solid fa-street-view text-success me-1"></i>
                                View
                              </span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <span
                        className={`${styleRecipes.btnCursor}`}
                        onClick={() => handleAddToFavorites(rec.id)}
                      >
                        <i
                          className={`${styleRecipes.iconHeart} fa-solid fa-heart text-danger`}
                        ></i>
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  <ImgNotData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* // Modal for adding to favorites */}
      <div
        className={`modal fade ${showConfirmationModal ? "show" : ""}`}
        id="addToFavoritesModal"
        tabIndex="-1"
        aria-labelledby="addToFavoritesModalLabel"
        aria-hidden={!showConfirmationModal}
        style={{ display: showConfirmationModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addToFavoritesModalLabel">
                Add to Favorites
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowConfirmationModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to add this recipe to favorites?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn  btn-danger "
                onClick={confirmAddToFavorites}
              >
                {loadingBtn ? (
                  <RotatingLines
                    visible={true}
                    height="20"
                    width="20"
                    color="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <>
                    Add to Favorites
                    <i className="fa-solid fa-heart text-danger text-white ms-1"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for product view */}
      <div
        className={`modal fade ${showProductModal ? "show" : ""}`}
        id="productViewModal"
        tabIndex="-1"
        aria-labelledby="productViewModalLabel"
        aria-hidden={!showProductModal}
        style={{ display: showProductModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="productViewModalLabel">
                Product Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowProductModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className=" text-center ">
                {selectedProduct.imagePath ? (
                  <img
                    className="img-fluid w-75 rounded-3"
                    src={`https://upskilling-egypt.com/${selectedProduct?.imagePath}`}
                    alt=""
                  />
                ) : (
                  <img className={`${styleRecipes.imgrec}`} src={imgError} />
                )}
              </div>
              <div className=" text-center mt-2">
                <h4 className=" text-success">{selectedProduct.name}</h4>
                <h6>{selectedProduct.price}</h6>
                <p>{selectedProduct.description}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowProductModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
