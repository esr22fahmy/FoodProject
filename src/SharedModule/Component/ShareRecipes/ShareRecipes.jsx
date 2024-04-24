import { useState, useEffect } from "react";
import axios from "axios";

const ShareRecipes = () => {
  const [ListRecipes, setListRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getRecipes = async (pageNu, pageSize, name, tagId, CatId) => {
    try {
      let { data } = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/",
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

      setTotalPages(data.totalNumberOfPages);
      setListRecipes(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRecipes(currentPage, 10); 
  }, [currentPage]);

  return { ListRecipes, setListRecipes, getRecipes, totalPages, setCurrentPage ,currentPage};
};


export default ShareRecipes;



  // "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1",
