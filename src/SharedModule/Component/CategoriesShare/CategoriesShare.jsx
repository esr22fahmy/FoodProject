import { useState, useEffect } from "react";
import axios from "axios";

const CategoriesShare = () => {
    const [CategoriesList, setCategoriesList] = useState([]);

  const CategoriesShow = async () => {
    try {
      let dtaCategories = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      // console.log(CategoriesList)

      setCategoriesList(dtaCategories.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    CategoriesShow();
  }, []);

  return { CategoriesList ,setCategoriesList ,CategoriesShow};
};

export default CategoriesShare;
