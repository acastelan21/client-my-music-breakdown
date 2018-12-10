import React from 'react'
import "./NavBar.scss";
import {Navbar, NavbarBrand} from "reactstrap";
const NavBar = (props) => {
  return (
    <React.Fragment>
        <Navbar>
            <NavbarBrand>My Music Breakdown</NavbarBrand>
            <p>Hello, {props.userName}</p>
            <img src={props.userImage} alt="user"/>
        </Navbar>
    </React.Fragment>
  )
}

export default NavBar;
