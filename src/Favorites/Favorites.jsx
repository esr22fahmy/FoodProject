import React, { useEffect, useState } from "react";
import Header from "../SharedModule/Component/Header/Header";
import imgRes from "../imgs/imgRes.png";
import axios from "axios";
import ImgNotData from "../SharedModule/Component/ImgNotData/ImgNotData";
import imgError from "../imgs/false-2061131_1280.png";
import FavoritesStyle from "../Favorites/Favorites.module.css";
import { RotatingLines } from "react-loader-spinner";

export default function Favorites() {
  const [favorList, setfavorList] = useState([]);
  const [itemRemoved, setItemRemoved] = useState(false);


  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/userRecipe/",
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      setfavorList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (itemRemoved) {
      setItemRemoved(false); 
    }
  }, [itemRemoved]);

  useEffect(() => {
    let getItems = localStorage.getItem('favRecipes')
    getItems = JSON.parse(getItems)
    setfavorList(getItems)
  }, [])

  const removeFromFavorites = async (recipeId) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/userRecipe/${recipeId}`,
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      setfavorList((prevFavorites) =>
        prevFavorites.filter((item) => item.id !== recipeId)
      );
      let newlistFav = favorList.filter((item) => item.id !== recipeId)
      localStorage.setItem('favRecipes', JSON.stringify(newlistFav))
      setItemRemoved(true); 
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <Header
        className="text-white"
        title={`Favorites Items !`}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgHom={imgRes}
      />

      <div className="container">
        <div className="row p-4">
          {favorList?.length > 0 ? (
            favorList.map((fav, index) => (
              <div className="col-md-4" key={index}>
                <div className="card my-2">
                  {fav.imagePath ? (
                    <img
                      className="card-img-top img-fluid position-relative"
                      src={`https://upskilling-egypt.com/${fav.imagePath}`}
                      alt="Card image favorite"
                    />
                  ) : (
                    <img className="imgFav" src={imgError} />
                  )}

                  <div
                    className={`${FavoritesStyle.formIconClose}`}
                    onClick={() => removeFromFavorites(fav.id)}
                  >
                    <i className={`${FavoritesStyle.iconClose} fa-solid fa-xmark`}></i>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{fav?.name}</h5>
                    <p className="card-text">{fav?.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="col-md-4 text-center m-auto">
                <ImgNotData />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}