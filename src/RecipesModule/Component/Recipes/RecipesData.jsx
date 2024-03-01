import React, { useEffect, useState } from "react";
import RecipsHeader from "../../../SharedModule/Component/RecipsHeader/RecipsHeader";
import { useForm } from "react-hook-form";
import styleRecipes from "../Recipes/Recipes.module.css";
import ShareRecipes from "../../../SharedModule/Component/ShareRecipes/ShareRecipes";
import ShareCategories from "../../../SharedModule/Component/CategoriesShare/CategoriesShare";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from 'react-router-dom';
import {  useNavigate } from "react-router-dom";


export default function RecipesData() {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const { ListRecipes, getRecipes } = ShareRecipes();
  const { CategoriesList } = ShareCategories();
  const location = useLocation();
  // console.log(location)
  // const { recipe } = location.state;
  const navigate = useNavigate();
  const recipe = location.state && location.state.recipe ? location.state.recipe : null;
  // change button
  const [isEditing, setIsEditing] = useState(false);

  // console.log(recipe)

  useEffect(() => {
    setIsEditing(recipe !== null);

    if (recipe) {
      setValue("name", recipe.name);
      setValue("price", recipe.price);
      setValue("description", recipe.description); 
      setValue("tagId", recipe.tagId); 
      setValue("categoriesIds", recipe.categoriesIds); 
      setValue("recipeImage", recipe.recipeImage?.[0]); 
    }
  }, [recipe, setValue]);

  const submitRecipesData = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("tagId", data.tagId);
      formData.append("categoriesIds", data.categoriesIds);
      formData.append("recipeImage", data.recipeImage?.[0]);

      let response;
      if (recipe && recipe.id) {
        response = await axios.put(
          `https://upskilling-egypt.com:443/api/v1/Recipe/${recipe.id}`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("tokemAdmin"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(response.data.message);
        // console.log(response)

      } else {
        response = await axios.post(
          `https://upskilling-egypt.com:443/api/v1/Recipe/`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("tokemAdmin"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response.data.message)

        toast.success(response.data.message);

      }
      toast.success(response.data.message);
      reset(); 
      getRecipes();
      navigate("/dashboard/recipes");
    } catch (error) {
      // console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
         <ToastContainer />
      <RecipsHeader />

      <div className=" container mb-5">
      <form onSubmit={handleSubmit(submitRecipesData)}>
          <div className="input-group mb-3">
            <input
              className={`${styleRecipes.inputs} form-control`}
              type="text"
             
              
              placeholder="Recipe Name"
              {...register("name", {
                required: "name Address is required",
              })}
            />
            {errors.name && (
              <div className="alert alert-danger  d-inline-block w-100 mt-1">
                {errors.name.message}
              </div>
            )}
          </div>
      
          {/* tag Id */}
          
            <div className="input-group mb-3">
            <select
              {...register("tagId", {
                required: "tagId Id Address is required",
              })}
              className={`${styleRecipes.inputs} form-select`}
              aria-label="Default select example"
            >
              {/* <option selected>Tag</option> */}
              {ListRecipes?.map((rec, index) => (
                <option key={index} value= {rec.tag.id}
                >
                  {rec.tag.id}
                </option>
              ))}
            </select>
            {errors.tagId && (
              <div className="alert alert-danger  d-inline-block w-100 mt-1">
                {errors.tagId.message}
              </div>
            )}
          </div>

          {/* price */}

          <div className="input-group mb-3">
            <input
              className={`${styleRecipes.inputs} form-control`}
              type="number"
              placeholder="price"
              {...register("price", {
                required: "price Address is required",
              })}
            />
               <span
                        className={`${styleRecipes.PriceEGP}`}
                        
                      >EGP</span>
            {errors.price && (
              <div className="alert alert-danger  d-inline-block w-100 mt-1">
                {errors.price.message}
              </div>
            )}
          </div>
          {/* categoriesIds */}
          <div className="input-group mb-3">
            <select
              {...register("categoriesIds", {
                required: "categories Id Address is required",
              })}
              className={`${styleRecipes.inputs} form-select`}
              aria-label="Default select example"
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

          {/*Description  */}

          <div className="input-group mb-3">
            <textarea
              placeholder="Description "
              className={`${styleRecipes.inputs} form-control`}
              id="exampleFormControlTextarea1"
              rows="4"
              {...register("description", {
                required: "description Address is required",
              })}
            ></textarea>

            {errors.description && (
              <div className="alert alert-danger  d-inline-block w-100 mt-1">
                {errors.description.message}
              </div>
            )}
          </div>

          {/* input img */}

          <div className="input-group mb-3">
            <input
              className={`${styleRecipes.inputs} form-control`}
              type="file"
              // {...register("recipeImage", {
              //   required: "recipeImage is required",
              // })}
            />
            {errors.recipeImage && (
              <div className="alert alert-danger  d-inline-block w-100 mt-1">
                {errors.recipeImage.message}
              </div>
            )}
          </div>



          <div className="text-end">

          <button className={`btn ${isEditing ? "btn-warning" : "btn-success"}`}>
              {isEditing ? "Edit" : "Save"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
}
