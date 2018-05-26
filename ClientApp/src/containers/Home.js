import React from 'react';
import { connect } from 'react-redux';
// import { routerActions } from 'react-router-redux';
import Card from 'antd/lib/card';
import { LinkContainer } from 'react-router-bootstrap';
import SearchForm from '../components/Shared/SearchForm';

const Home = props => (
  <div style={{ marginTop: 20 }}>
    <div>
      <button type="button" className="btn btn-primary" onClick={()=> props.history.push('/projects/map')}>Test Push Redux Location</button>
    </div>
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
