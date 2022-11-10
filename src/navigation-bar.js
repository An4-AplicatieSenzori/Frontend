//Imports:
import React from 'react'
import logo from './commons/images/energyIcon.png';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';
//import "./styles.css";

//Text styles:
const textStyle = {
    color: 'white',
    textDecoration: 'none',
    //hover: 'red',
    //hoverStart: 'red'
};

const dropdownItems = {
}

//Constanta div:
const NavigationBar = () => (
    //Inafara de style, mai trebuie puse hrefurile aici!!!
    //Href devine admin page pentru a pune acolo informatiile!
    <div>
        <Navbar color="dark" light expand="extra-large">
            <NavbarBrand href="/admin">
                <img src={logo} width={"50"}
                     height={"50"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >

                        <DropdownItem style = {{color: "#d01010"}}>
                            <NavLink href="/admin/user">User</NavLink>
                        </DropdownItem>

                        <DropdownItem style = {{color: "#1c3b9f"}}>
                            <NavLink href="/admin/device">Device</NavLink>
                        </DropdownItem>

                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Navbar>
    </div>
);



//Export constant;
export default NavigationBar

//backgroundcolor: "#d01010"
//<NavLink href="/error">ErrorsPage</NavLink>


