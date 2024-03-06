import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Home from "../../../HomeModule/Component/Home/Home";
import imgSidebar from "../../../imgs/3.png";
import styleSide from "../SideBar/SideBar.module.css";
import Categories from "../../../CategoriesModule/Component/Categories/Categories";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChangPass from "../../../AuthModule/Component/ChangPass/ChangPass";

export default function SideBar({ DataAdmin }) {
  // console.log(DataAdmin)
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const [iscollapsed, setiscollapsed] = useState(false);

  let openCloseSide = () => {
    setiscollapsed(!iscollapsed);
  };

  let FunLogout = () => {
    localStorage.removeItem("tokemAdmin");
    navigate("/login");
  };

  // end modals

  // show Categories
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ChangPass handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <div className="sidebar-container ">
        <Sidebar className="sidebarCon " collapsed={iscollapsed}>
          <Menu className=" mt-4 ">
            <MenuItem
              className=" MenImg"
              onClick={openCloseSide}
              icon={<img className="hideHover" src={imgSidebar} />}
            ></MenuItem>

            <MenuItem
              className="mt-4"
              icon={<i className="fa-solid fa-house"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            {DataAdmin?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa-solid fa-user-group"></i>}
                component={<Link to="/dashboard/user" />}
              >
                {" "}
                Users
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem
              icon={<i className="fa-solid fa-table-cells-large"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              {" "}
              Recipes
            </MenuItem>

            {DataAdmin?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa-solid fa-calculator"></i>}
                component={<Link to="/dashboard/categories" />}
              >
                {" "}
                Categories
              </MenuItem>
            ) : (
              ""
            )}
            {DataAdmin?.userGroup == "SystemUser" ? (
              <MenuItem
                icon={<i className="fa-solid fa-heart"></i>}
                component={<Link to="/dashboard/favorites" />}
              >
                {" "}
                Favorites
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              icon={<i className="fa-solid fa-lock"></i>}
              onClick={handleShow}
            >
              {" "}
              Change Password
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-right-from-bracket text-danger"></i>}
              onClick={FunLogout}
            >
              {" "}
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
