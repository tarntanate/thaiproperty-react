import React from 'react';
import { Panel } from 'react-bootstrap';

const MARGIN_TOP = '20px';

export const CenterContent = props => {
  if (props.usePanel) {
    return (
      <Panel onClick={props.handlePanelClick} style={{ marginTop: MARGIN_TOP }}>
        <Panel.Body
          style={{
            width: '100%',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        >
          {props.children}
        </Panel.Body>
      </Panel>
    );
  } else {
    return (
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          verticalAlign: 'middle',
          marginTop: MARGIN_TOP,
        }}
      >
        {props.children}
      </div>
    );
  }
};
