import React, { Component } from 'react'

export default class NavBar extends Component {
    
  /*render() {
    return (
      <div>NavBar</div>
      
    )
  }
}*/
render() {

    return (
        <div>
            <div className="horizontalMenu">
                
                
                <nav className="navbar navbar-expand-custom navbar-mainbg">
                    <a className="navbar-brand navbar-logo" href="#">Navbar</a>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3000/medicinerequests/dashboard"><i className="fas fa-tachometer-alt"></i><b>Dashboard</b></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3000/medicinerequests/view"><i className="far fa-address-book"></i><b>Medicine Requests</b></a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3000/medicinerequests/viewS/643eeaa9e138a61e0e0be266"><i className="far fa-clone"></i><b>View Component</b></a>
                            </li>
                            
                        </ul>
                    </div>
                </nav>
            </div>


            

        </div>
    )
}}
