import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Home from '../../../HomeModule/Component/Home/Home';
import imgSidebar from "../../../imgs/3.png"
import styleSide from "../SideBar/SideBar.module.css"
export default function SideBar() {
  const navigate = useNavigate();

  const [iscollapsed, setiscollapsed] = useState(false);

  let openCloseSide =()=>{
    setiscollapsed(!iscollapsed)
  }

  let FunLogout = () => {
    localStorage.removeItem("tokemAdmin");
    navigate("/login");
  };
  return (
    <>
      <Sidebar className="sidebarCon " collapsed={iscollapsed}>
        <Menu className=" mt-4 ">
        <MenuItem className=" MenImg" onClick={openCloseSide} icon={<img className='hideHover' src={imgSidebar}/>} >
          </MenuItem>


          <MenuItem className="mt-4" icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-user-group"></i>} component={<Link to="/dashboard/user" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-table-cells-large"></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-calculator"></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>

          <MenuItem icon={<i className="fa-solid fa-lock"></i>} component={<Link to="/vvv" />}> Change Password</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={FunLogout}> Logout</MenuItem>
        </Menu>
      </Sidebar>
      {/* <button className=" alert alert-danger " onClick={FunLogout}>
{" "}
logout
</button> */}
    </>
  );
}
