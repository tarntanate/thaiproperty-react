import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import NavMenu from './NavMenu';
import { PageFooter } from './Footer';

export default class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavMenu/>
                <Container>
                    <Row>
                        <Col style={{ paddingLeft: '4px', paddingRight: '4px' }} >
                            {this.props.children}
                            <PageFooter />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
};
