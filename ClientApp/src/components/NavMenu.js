import React from 'react';
import { Link } from 'react-router-dom';
// import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
  
import { Icon } from 'react-fa';
import { LinkContainer } from 'react-router';
// import './NavMenu.css';

export default class NavMenu extends React.Component {

    state = {
        isOpen: false,
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <Navbar color="dark" dark expand="sm">
                <NavbarBrand href="/">[Logo] React App</NavbarBrand>
                <NavbarToggler onClick={this.toggleCollapse} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="text-light" href="/"><Icon name="home" /> Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-light" href="/projects/map"><Icon name="map-marker" /> Map</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="text-light" nav caret>
                                <Icon name="search" /> Search
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem>
                                Option 1
                            </DropdownItem>
                            <DropdownItem>
                                Option 2
                            </DropdownItem>
                            <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}