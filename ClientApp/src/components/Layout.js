import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';
import { PageFooter } from './Footer';

export default props => (
  <Grid fluid>
    <Row>
      <Col sm={3}>
        <NavMenu />
      </Col>
      <Col sm={9} style={{ paddingLeft: '0px', paddingRight: '5px' }}>
        {props.children}
        <PageFooter />
      </Col>
    </Row>
  </Grid>
);
