import { useState, useEffect } from "react";
import axios from "axios";

const CategoriesShare = () => {
    const [CategoriesList, setCategoriesList] = useState([]);
    const [getPages, setgetPages] = useState(0);

  const CategoriesShow = async (pageNu, pageSize ,name ,) => {
    try {
      let dataCategories = await axios.get(
        // "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        "https://upskilling-egypt.com:3006/api/v1/Category/",

        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
          params: {
            pageNumber: pageNu,
            name: name,
            pageSize: pageSize,
            
          },
        }
      );
      const totalPages = dataCategories.data.totalNumberOfPages;
      const pagesArray = Array.from(Array(totalPages).keys()).map((num) => num + 1);
      
      setgetPages(pagesArray);
    
      // console.log(CategoriesList)
      setCategoriesList(dataCategories.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    CategoriesShow(1.10);
  }, []);

  return { CategoriesList ,setCategoriesList ,CategoriesShow ,getPages };
};

export default CategoriesShare;
