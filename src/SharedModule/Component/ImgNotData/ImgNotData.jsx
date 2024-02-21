import React from 'react'
import imgNoData from "../../../imgs/noData.png";

export default function ImgNotData() {
  return (
    <>
      <img src={imgNoData} />
            <h5 className=" mt-3">No Data !</h5>
            <h6 className=" text-muted ">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </h6>
      
    </>
  )
}
