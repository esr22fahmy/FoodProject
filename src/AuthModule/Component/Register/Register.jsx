import React, { useState } from "react";
import imgLogo from "../../../imgs/logoLogin.svg";
import { ToastContainer, toast } from "react-toastify";
import styleRegister from "../Register/Register.module.css";
import { RotatingLines } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const togglePasswordVisibilityconfirm = () => {
    setShowPasswordConfirm((prevState) => !prevState);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  let appedForm = (data) => {
    let fomData = new FormData();
    fomData.append("userName", data.userName);
    fomData.append("email", data.email);
    fomData.append("country", data.country);
    fomData.append("phoneNumber", data.phoneNumber);
    fomData.append("profileImage", data.profileImage[0]);
    fomData.append("password", data.password);
    fomData.append("confirmPassword", data.confirmPassword);
    return fomData;
  };

  async function onSubmit(data) {
    // console.log(data);

    setLoadingBtn(true);

    let registerForm = appedForm(data);

    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Register",
        registerForm
      );
      // console.log(response)

      toast.success("Registeration Done ");

      navigate("/verifyRegister");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoadingBtn(false);
  }

  // for useName
  const validateUserName = (value) => {
    // Check if the username has at least 4 characters
    if (value.length < 4) {
      return "The userName must be at least 4 characters.";
    }

    // Check if The userName must contain characters and end with numbers without spaces.
    const pattern = /^[a-zA-Z]+\d+$/;
    if (!pattern.test(value)) {
      return "The userName must contain characters and end with numbers without spaces.";
    }

    return true;
  };
  // for password
  const validatePassword = (value) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!pattern.test(value)) {
      return "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.";
    }

    return true;
  };

  // for ConfirmPassword

  const validateConfirmPassword = (value) => {
        // console.log(value)
    const password = getValues("password");
    if (value !== password) {
      return "Passwords do not match.";
    }
    return true;
  };
  return (
    <>
      <ToastContainer />

      <section className={`${styleRegister.secLogin}`}>
        <div className="AuthContainer vh-100">
          <div className="AuthLayer vh-100 container-fluid">
            <div className=" row vh-100 justify-content-center  align-items-center">
              <div className=" col-md-6">
                <div className=" bg-white rounded-3 px-5 py-4">
                  <div className="  text-center">
                    <img className=" w-50 " src={imgLogo} alt=" logo food" />
                  </div>

                  <h5>Register </h5>
                  <p className=" text-muted">
                    Welcome Back! Please enter your details
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" row">
                      <div className=" col-md-6">
                        {/* UserName */}
                        <div className="input-group mb-3">
                          <span
                            className={`${styleRegister.IconInput} input-group-text`}
                            id="basic-addon1"
                          >
                            <i className="fa-solid fa-mobile-screen-button"></i>
                          </span>
                          <input
                            className={`${styleRegister.InputLogin} form-control`}
                            type="text"
                            placeholder="User Name"
                            {...register("userName", {
                              required: "userName is required",
                              validate: validateUserName,
                            })}
                          />
                          {errors.userName && (
                            <div className="alert alert-danger  d-inline-block w-100 mt-1">
                              {errors.userName.message}
                            </div>
                          )}
                        </div>

                        {/*  Country*/}

                        <div className="input-group mb-3">
                          <span
                            className={`${styleRegister.IconInput} input-group-text`}
                            id="basic-addon1"
                          >
                            <i className="fa-solid fa-lock"></i>
                          </span>
                          <input
                            className={`${styleRegister.InputLoginPass} form-control`}
                            type="text"
                            placeholder="Country  "
                            {...register("country", {
                              required: "country is required ",
                            })}
                          />

                          {errors.country && (
                            <div className="alert alert-danger  d-inline-block w-100 mt-1">
                              {errors.country.message}
                            </div>
                          )}
                        </div>

                        {/* Password */}

                        <div className="input-group mb-3">
                          <span
                            className={`${styleRegister.IconInput} input-group-text`}
                            id="basic-addon1"
                          >
                            <i className="fa-solid fa-lock"></i>
                          </span>
                          <input
                            className={`${styleRegister.InputLoginPass} form-control`}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password  "
                            {...register("password", {
                              required: "password is required ",
                              validate: validatePassword,
                            })}
                          />

                          <i
                            className={`fa-regular fa-eye${
                              showPassword ? "-slash" : ""
                            }`}
                            onClick={togglePasswordVisibility}
                          ></i>

                          {errors.password && (
                            <div className="alert alert-danger  d-inline-block w-100 mt-1">
                              {errors.password.message}
                            </div>
                          )}
                        </div>
                      </div>

                      {/*  anther col*/}

                      {/* Email */}
                      <div className=" col-md-6">
                        <div className="input-group mb-3">
                          <span
                            className={`${styleRegister.IconInput} input-group-text`}
                            id="basic-addon1"
                          >
                            <i className="fa-solid fa-mobile-screen-button"></i>
                          </span>
                          <input
                            className={`${styleRegister.InputLogin} form-control`}
                            type="email"
                            placeholder="Enter Your E-mail"
                            {...register("email", {
                              required: "Email Address is required",
                              pattern: {
                                value:
                                  /[A-Za-z0-9._%+-]+@(gmail|yahoo|email)\.com/,
                                message: "Email Not vaild",
                              },
                            })}
                          />
                          {errors.email && (
                            <div className="alert alert-danger  d-inline-block w-100 mt-1">
                              {errors.email.message}
                            </div>
                          )}
                        </div>

                        {/* phone Number */}
                        <div className="input-group mb-3">
                          <span
                            className={`${styleRegister.IconInput} input-group-text`}
                            id="basic-addon1"
                          >
                            <i className="fa-solid fa-mobile-screen-button"></i>
                          </span>
                          <input
                            className={`${styleRegister.InputLogin} form-control`}
                            type="tel"
                            placeholder="Phone Number"
                            {...register("phoneNumber", {
                              required: "Phone Number is required",
                              pattern: {},
                            })}
                          />
                          {errors.phoneNumber && (
                            <div className="alert alert-danger  d-inline-block w-100 mt-1">
                              {errors.phoneNumber.message}
                            </div>
                          )}
                        </div>

                        {/* confirm-password */}
                        <div className="input-group mb-3">
                          <span
                            className={`${styleRegister.IconInput} input-group-text`}
                            id="basic-addon1"
                          >
                            <i className="fa-solid fa-mobile-screen-button"></i>
                          </span>
                          <input
                            className={`${styleRegister.InputLogin} form-control`}
                            type={showPasswordConfirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            {...register("confirmPassword", {
                              required: "Confirm Password is required",
                              validate: validateConfirmPassword,
                            })}
                          />
                          <i
                            className={`fa-regular fa-eye${
                              showPasswordConfirm ? "-slash" : ""
                            }`}
                            onClick={togglePasswordVisibilityconfirm}
                          ></i>
                          {errors.confirmPassword && (
                            <div className="alert alert-danger  d-inline-block w-100 mt-1">
                              {errors.confirmPassword.message}
                            </div>
                          )}
                        </div>

                        {/* input img */}
                      </div>
                    </div>

                    <div className="input-group mb-3">
                      <input
                        className={`${styleRegister.inputs} form-control`}
                        type="file"
                        {...register("profileImage")}
                        // {...register("profileImage", {
                        //   required: "profileImage is required",
                        // })}
                      />
                      {/* {errors.profileImage && (
                        <div className="alert alert-danger  d-inline-block w-100 mt-1">
                          {errors.profileImage.message}
                        </div>
                      )} */}
                    </div>

                    <div className=" text-end my-2">
                      <Link to="/login" className=" text-success">
                        Login Now?
                      </Link>
                    </div>

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
                        "Register"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
