import React, { useState } from "react";
import styleLogin from "../Login/Login.module.css";
import imgLogo from "../../../imgs/logoLogin.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";

export default function ChangPass({ handleClose }) {
  const [loadingBtn, setloadingBtn] = useState(false);
  const [massageError, setmassageError] = useState("");
  // showPassword
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPasswor, setshowNewPasswor] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleNewPassword = () => {
    setshowNewPasswor((prevState) => !prevState);
  };

  const togglePasswordVisibilityconfirm = () => {
    setShowPasswordConfirm((prevState) => !prevState);
  };

  //
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // data => شايل data for inputs
  async function onSubmit(data) {
    setloadingBtn(true);

    if (data.newPassword === data.confirmNewPassword) {
      try {
        let DtaApi = await axios.put(
          "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",
          data,
          {
            headers: {
              Authorization: localStorage.getItem("tokemAdmin"),
            },
          }
        );

        //   console.log(DtaApi);
        handleClose();
        toast.success("You are  change password");
      } catch (error) {
        // console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
      setloadingBtn(false);
    } else {
      setmassageError("Your New Password Don't Equal Your Confirm Password ");
      setloadingBtn(false);
    }

    // console.log(data)
  }
  return (
    <>
      <div className=" row justify-content-center  align-items-center">
        <div className=" col-md-12">
          <div className=" bg-white rounded-3 px-5 py-4">
            <div className="  text-center">
              <img className=" w-50 " src={imgLogo} alt=" logo food" />
            </div>

            <h5 className=" mt-3"> Change Your Password </h5>
            <p className=" text-muted">Enter your details below</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* old password */}

              <div className="input-group mb-3">
                <span
                  className={`${styleLogin.IconInput} input-group-text`}
                  id="basic-addon1"
                >
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  className={`${styleLogin.InputLoginPass} form-control`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Old Password  "
                  {...register("oldPassword", {
                    required: "old Password is required ",
                    //     pattern:{
                    //       value: /^[a-zA-Z]{4}\d{1,5}$/,
                    //       message:"password Not vaild"
                    // }
                  })}
                />

                <i
                  className={`fa-regular fa-eye${showPassword ? "-slash" : ""}`}
                  onClick={togglePasswordVisibility}
                ></i>

                {errors.oldPassword && (
                  <div className="alert alert-danger  d-inline-block w-100 mt-1">
                    {errors.oldPassword.message}
                  </div>
                )}
              </div>

              {/*new password */}

              <div className="input-group mb-3">
                <span
                  className={`${styleLogin.IconInput} input-group-text`}
                  id="basic-addon1"
                >
                  <i className="fa-solid fa-lock"></i>
                </span>
                {/* password */}
                <input
                  className={`${styleLogin.InputLogin} form-control`}
                  placeholder="New Password"
                  type={showNewPasswor ? "text" : "password"}

                  {...register("newPassword", {
                    required: "new Password is required",
                 
                  })}
                />

                <i
                  className={`fa-regular fa-eye${
                    showNewPasswor ? "-slash" : ""
                  }`}
                  onClick={toggleNewPassword}
                ></i>

                {errors.newPassword && (
                  <div className="alert alert-danger  d-inline-block w-100 mt-1">
                    {errors.newPassword.message}
                  </div>
                )}
              </div>

              {/* confirmPassword */}

              <div className="input-group mb-3">
                <span
                  className={`${styleLogin.IconInput} input-group-text`}
                  id="basic-addon1"
                >
                  <i className="fa-solid fa-lock"></i>
                </span>
                {/* confirmPassword */}
                <input
                  className={`${styleLogin.InputLogin} form-control`}
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword", {
                    required: "confirm Password is required",
                  })}
                />
                <i
                  className={`fa-regular fa-eye${
                    showPasswordConfirm ? "-slash" : ""
                  }`}
                  onClick={togglePasswordVisibilityconfirm}
                ></i>

                {errors.confirmNewPassword && (
                  <div className="alert alert-danger  d-inline-block w-100 mt-1">
                    {errors.confirmNewPassword.message}
                  </div>
                )}
              </div>

              {massageError ? (
                <div className=" alert alert-danger"> {massageError}</div>
              ) : (
                ""
              )}
              
              <button className=" w-100 btn btn-success">
                {" "}
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
                  "Change Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
