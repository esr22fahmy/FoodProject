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


export default function Recipes() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [show, setShow] = useState(false);
  const [RecipeIdToDelete, setRecipeIdIdToDelete] = useState(null);
  const [RecipeWord, setRecipeWord] = useState("Recipe");

  // used custom hook to make the data share
  const { ListRecipes, setListRecipes, getRecipes } = ShareRecipes();
  const { CategoriesList } = ShareCategories();
   // tagId
   const { isTag, setisTag } = TagIdShare();


  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  // show Recipes

  // let getRecipes = async () => {
  //   try {
  //     let { data } = await axios.get(
  //       "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1",
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("tokemAdmin"),
  //         },
  //       }
  //     );

  //     // console.log(data.data)
  //     setListRecipes(data.data);
  //     console.log(ListRecipes);
  //     return {ListRecipes };

  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // -----------------

  // delete
  useEffect(() => {
    getRecipes();
  }, []);

  const deleteRecipe = async (RecipeId) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${RecipeId}`,
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

    // console.log(recipe)
    // console.log("edittt")
    // setTest()
  };

  const handleAddNewItem = () => {
    // i put null because i put :/id in app
    navigate("/dashboard/recipesData/null");
  };

  return (
    <>
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
            <button
              onClick={handleAddNewItem}
              className={`${styleRecipes.btnAdd} btn px-5 py-2`}
            >
              Add New Item
            </button>
          </div>
        </div>
      </div>
      {/* fillter */}
      <div className=" container">
        <div className=" row p-4 ">
          <div className=" col-md-6">
            <input
              className="form-control"
              type="search"
              placeholder="Search..."
            />
          </div>

          <div className=" col-md-3">
          <div className="input-group mb-3">
            <select
              {...register("tagId", {
                required: "tagId Id Address is required",
              })}
              className={`${styleRecipes.inputs} form-select`}
            >
              {isTag?.map((rec, index) => (
                <option key={index} value= {rec.id}
                >
                  {rec.name}
                </option>
              ))}
            </select>
            {errors.tagId && (
              <div className="alert alert-danger  d-inline-block w-100 mt-1">
                {errors.tagId.message}
              </div>
            )}
          </div>
          </div>

          <div className=" col-md-3">
          <div className="input-group mb-3">
            <select
               className={`${styleRecipes.inputs} form-select`}
              {...register("categoriesIds", {
                required: "categories Id Address is required",
              })}
              // aria-label="Default select example"
            >
              {/* <option selected>Tag</option> */}
              {CategoriesList?.map((rec, index) => (
                <option key={index} value={rec.id}>
                  {rec.name}
                </option>
              ))}
            </select>
            {errors.categoriesIds && (
              <div className="alert alert-danger  d-inline-block w-100 mt-1">
                {errors.categoriesIds.message}
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/* table */}
      <div className=" text-center mt-5 mx-4 ">
        <table className="table ">
          <thead className="">
            <tr className="tableActive  ">
              <th scope="col "> Item Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Tag</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
        </table>
        {ListRecipes.length > 0 ? (
          <div className="container-fluid ">
            <table className=" table">
              <tbody>
                {ListRecipes.map((rec, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                    }}
                  >
                    {/* <td>{index}</td> */}

                    <td>{rec.name}</td>
                    <td className={`${styleRecipes.conImg}`}>
                      {rec.imagePath ? (
                        <img
                          className={`${styleRecipes.imgrec}`}
                          src={`https://upskilling-egypt.com/${rec.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <p>Not Img</p>
                      )}
                    </td>
                    <td>{rec.price}</td>
                    <td>{rec.description}</td>
                    <td>{rec.id}</td>
                    <td>{rec.category[0]?.name}</td>

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
                              onClick={() => handleEdit(rec)}
                              className="dropdown-item"
                            >
                              <span
                                className={`${styleRecipes.btnCursor}  border-0 px-2`}
                              >
                                <i className="fa-solid fa-pen-to-square text-warning me-1">
                                  {" "}
                                </i>
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
                                className={`${styleRecipes.btnCursor}   border-0  px-2`}
                              >
                                <i className="fa-solid fa-trash text-danger me-1"></i>
                                Delete
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
        ) : (
          <>
            <ImgNotData />
          </>
        )}
      </div>
    </>
  );
}
