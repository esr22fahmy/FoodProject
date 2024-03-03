import { useState, useEffect } from "react";
import axios from "axios";

const ShareRecipes = () => {
  const [ListRecipes, setListRecipes] = useState([]);
  const [getPages, setgetPages] = useState(0);

  const getRecipes = async (pageNu, pageSize, name, tagId, CatId) => {
    try {
      let { data } = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/",
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
          params: {
            pageNumber: pageNu,
            name: name,
            pageSize: pageSize,
            tagId: tagId,
            categoryId: CatId,
          },
        }
      );
  
      const totalPages = data.totalNumberOfPages;
      const pagesArray = Array.from(Array(totalPages).keys()).map((num) => num + 1);
      
      setgetPages(pagesArray);
      setListRecipes(data.data);
      console.log(data.totalNumberOfPages);
    } catch (error) {
      console.log(error.message);
    }
  };
  

  useEffect(() => {
    getRecipes(1, 10);
    // console.log(ListRecipes);


  }, []);

  return { ListRecipes, setListRecipes, getRecipes ,getPages };
};

export default ShareRecipes;



                // "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1",
