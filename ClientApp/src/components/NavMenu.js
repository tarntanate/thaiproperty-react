import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>[Logo]</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={'/'} exact>
          <NavItem>
            <Glyphicon glyph="home" />หน้าแรก
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/projects/map'}>
          <NavItem>
            <Glyphicon glyph="map-marker" />Map
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/list/condominium'}>
          <NavItem>
            <Glyphicon glyph="list" />ค้นหา
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
