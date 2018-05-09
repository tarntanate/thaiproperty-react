import React, { Component } from 'react';
import { connect } from 'react-redux';

class Project extends Component {
  render() {
    console.log(this.props.match);
    const { id } = this.props.match.params;
    return (
      <div style={{ marginTop: 10 }}>
        <h3>ProjectID: {id}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

// A shorthand version of mapDispatch to props is just to pass a configuration object
// that maps the names of the callback props to the corresponding action creator function
// https://egghead.io/lessons/javascript-redux-using-mapdispatchtoprops-shorthand-notation
// export default connect(mapStateToProps, { callbackProps: correspondingActionCreator })(Project);

export default connect(
  mapStateToProps,
)(Project);