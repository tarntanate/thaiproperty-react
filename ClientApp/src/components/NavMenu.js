import React from 'react';
import { NavLink } from 'react-router-dom';
// import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
  
import { Icon } from 'react-fa';
// import { LinkContainer } from 'react-router';
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
            <Navbar dark className="bg-gradient" fixed="top" expand="sm">
                <NavbarBrand href="/">Demo React App</NavbarBrand>
                <NavbarToggler onClick={this.toggleCollapse} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-link" activeClassName="active" to="/" exact><Icon name="home" fixedWidth /> Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" activeClassName="active" to="/projects/map"><Icon name="map-marker" fixedWidth /> Map</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="" nav caret>
                                <Icon name="search" fixedWidth /> Search
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <NavLink className="nav-link text-dark" activeClassName="active" to="/list/condo"><Icon name="cubes" /> คอนโด</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-link text-dark" activeClassName="active" to="/list/house" exact><Icon name="home" /> บ้านเดี่ยว</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-link text-dark" activeClassName="active" to="/list/townhome" exact><Icon name="home" /> ทาวน์โฮม</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-link text-dark" activeClassName="active" to="/list/land" exact><Icon name="map-signs" /> ที่ดิน</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-link text-dark" activeClassName="active" to="/list/apartment" exact><Icon name="home" /> อพาร์ทเมนท์</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-link text-dark" activeClassName="active" to="/list/building" exact><Icon name="building-o" /> ตึกแถว อาคารพานิชย์</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-link text-dark" activeClassName="active" to="/list/office/rent" exact><Icon name="briefcase" /> สำนักงานให้เช่า</NavLink>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    ค้นหาจาก keyword
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}