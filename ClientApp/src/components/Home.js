import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchForm from './Shared/SearchForm';

const Home = props => (
  <div style={{ marginTop: 20 }}>
    <LinkContainer to={'/projectlist'}>
      <NavItem>Click here to see a demo of Condominium Project List on Map</NavItem>
    </LinkContainer>
    {false && (
      <Card title="Under development!" bordered={true} style={{ width: 360, marginTop: 20 }}>
        <SearchForm
          handleFormSubmit={() => {
            alert('Not Implemented Yet!');
          }}
        />
      </Card>
    )}
  </div>
);

export default connect()(Home);
