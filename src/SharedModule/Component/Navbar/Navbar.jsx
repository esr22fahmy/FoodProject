import React from 'react'
import styleNav from "../Navbar/Navbar.module.css"

export default function Navbar({DataAdmin}) {

  // console.log(DataAdmin)
  return (
    <div className=''>
<nav className={`${styleNav.navCon} navbar navbar-expand-lg my-4 rounded-4`}>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <a className="nav-link text-black" href="#"> {DataAdmin?.userName}</a>
        </li>
       
       
      </ul>
    
    </div>
  </div>
</nav>      
    </div>
  )
}
