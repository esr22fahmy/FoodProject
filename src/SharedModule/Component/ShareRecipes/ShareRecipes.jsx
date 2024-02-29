import { useState, useEffect } from "react";
import axios from "axios";

const ShareRecipes = () => {
  const [ListRecipes, setListRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      let { data } = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      setListRecipes(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return { ListRecipes ,setListRecipes ,getRecipes};
};

export default ShareRecipes;
