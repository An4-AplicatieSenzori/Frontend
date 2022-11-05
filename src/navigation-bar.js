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

//Text styles:
const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

//Constanta div:
const NavigationBar = () => (
    //Inafara de style, mai trebuie puse hrefurile aici!!!
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >
                        <DropdownItem>
                            <NavLink href="/person">Persons</NavLink>
                            <NavLink href="/error">ErrorsPage</NavLink>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Navbar>
    </div>
);

//Export constant;
export default NavigationBar




