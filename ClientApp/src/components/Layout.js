import React from 'react';
// import { Col, Grid, Row } from 'react-bootstrap';
import { Container, Col, Row } from 'reactstrap';
import NavMenu from './NavMenu';
import { PageFooter } from './Footer';

export default props => (
    <div>
        <NavMenu />
        <Container>
            <Row>
                <Col style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                    {props.children}
                    <PageFooter />
                </Col>
            </Row>
        </Container>
    </div>
);
