import React from "react";
import Header from "../../../SharedModule/Component/Header/Header";
import imgRes from "../../../imgs/imgRes.png";
export default function User() {
  return (
    <div>
      <Header
        className="  text-white"
        title={`Users List`}
        description={
          <p>
            You can now add your items that any user can order it from the
            Application and you can edit
          </p>
        }
        imgHom={imgRes}
      />{" "}
    </div>
  );
}
