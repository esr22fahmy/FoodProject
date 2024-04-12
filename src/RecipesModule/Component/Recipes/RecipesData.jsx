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
import TagIdShare from "../../../SharedModule/Component/TagIdShare/TagIdShare";
import { RotatingLines } from "react-loader-spinner";


export default function RecipesData() {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const { ListRecipes, getRecipes } = ShareRecipes();
  // tagId
  const { isTag, setisTag } = TagIdShare();

  // console.log(ListRecipes)
  const { CategoriesList } = ShareCategories();
  const location = useLocation();
  // console.log(location)
  // const { recipe } = location.state;
  const [loadingBtn, setLoadingBtn] = useState(false);


  const navigate = useNavigate();
  const recipe = location.state && location.state.recipe ? location.state.recipe : null;
  // change button
  const [isEditing, setIsEditing] = useState(false);

  // console.log(recipe)

  useEffect(() => {
    setIsEditing(recipe !== null);

    if (recipe) {
      // console.log(recipe)
      
      // give me value in inputs and put them in (name,price,description,tagId,categoriesIds ,recipeImage) for api
      setValue("name", recipe.name);
      setValue("price", recipe.price);
      setValue("description", recipe.description); 
      setValue("tagId", recipe.tag.id); 
      setValue("categoriesIds", recipe.category[0].id); 
      // console.log(   "ccc",   setValue("categoriesIds", recipe.category[0].id)
      // )
      setValue("recipeImage", recipe.recipeImage?.[0]); 

    }
  }, [recipe, setValue]);

  const submitRecipesData = async (data) => {
    setLoadingBtn(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("tagId", data.tagId);
      formData.append("categoriesIds", data.categoriesIds);
      formData.append("recipeImage", data.recipeImage?.[0]);
      // console.log( data.recipeImage?.[0])
      
      

      let response;
      if (recipe && recipe.id) {
        response = await axios.put(
          `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipe.id}`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("tokemAdmin"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response)

      } 
      else {
        response = await axios.post(
          `https://upskilling-egypt.com:3006/api/v1/Recipe/`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("tokemAdmin"),
              "Content-Type": "multipart/form-data",
            },
          }
        );


      }
      console.log(response);
      reset(); 
      getRecipes();
      navigate("/dashboard/recipes");
        toast.success(" The Recipe created successfully");
        // toast.success(response.data.message);

    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error);
    }

    // console.log(data)
    setLoadingBtn(false);

  };



  // const getTag = async () => {
  //   try {
  //     let tagList = await axios.get(
  //       "https://upskilling-egypt.com:443/api/v1/tag/",
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("tokemAdmin"),
  //         },
  //       }
  //     );
  //     setisTag(tagList.data);
  //     console.log(tagList.data)

  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getTag();
  //   // console.log(isTag)

  // }, []);

  return (
    <>
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
            >
               {/* <option value='Tag'>Tag</option> */}
 
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
               className={`${styleRecipes.inputs} form-select`}
              {...register("categoriesIds", {
                required: "categories Id Address is required",
              })}
              // aria-label="Default select example"
            >
              {/* <option value=''>categories</option> */}
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
              {...register("recipeImage")}
              //   required: "recipeImage is required",
              // })}
            />
            {/* {errors.recipeImage && (
              <div className="alert alert-danger  d-inline-block w-100 mt-1">
                {errors.recipeImage.message}
              </div>
            )} */}
          </div>



          <div className="text-end">

          <button className={`btn ${isEditing ? "btn-warning" : "btn-success"}`}>
          {loadingBtn ? (
                        <RotatingLines
                          visible={true}
                          height="20"
                          width="20"
                          color="grey"
                          strokeWidth="5"
                          animationDuration="0.75"
                          ariaLabel="rotating-lines-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        isEditing ? "Edit" : "Save"
                        )}
            </button>
          </div>

        </form>
      </div>
    </>
  );
}
