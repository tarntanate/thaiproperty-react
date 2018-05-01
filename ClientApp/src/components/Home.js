import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import SearchForm from './Shared/SearchForm';

const Home = props => (
  <Card title="Under development!" bordered={true} style={{ width: 360, marginTop: 20 }}>
    <SearchForm
      handleFormSubmit={() => {
        alert('Not Implemented Yet!');
      }}
    />
  </Card>
);

export default connect()(Home);
