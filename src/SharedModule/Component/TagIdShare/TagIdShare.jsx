
import { useState, useEffect } from "react";
import axios from "axios";

const TagIdShare = () => {
    const [isTag, setisTag] = useState([]);

 
  const getTag = async () => {
    try {
      let tagList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/tag/",
        {
          headers: {
            Authorization: localStorage.getItem("tokemAdmin"),
          },
        }
      );
      setisTag(tagList.data);
    //   console.log(tagList.data)

    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTag();
    // console.log(isTag)

  }, []);

  return { isTag ,setisTag ,getTag};
};

export default TagIdShare;
