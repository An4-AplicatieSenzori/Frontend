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
    <div>
        <Navbar color="dark" light expand="extra-large">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"50"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >
                        <DropdownItem style = {{backgroundcolor: 'red',}}>
                            <NavLink href="/User">User</NavLink>
                            <NavLink href="/Device">Device</NavLink>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Navbar>
    </div>
);

//Export constant;
export default NavigationBar

//<NavLink href="/error">ErrorsPage</NavLink>


