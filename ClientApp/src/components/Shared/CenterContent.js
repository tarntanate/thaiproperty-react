import React from 'react';
import { Card, CardBody } from 'reactstrap';

const MARGIN_TOP = '20px';

export const CenterContent = props => {
  if (props.usePanel) {
    return (
      <Card onClick={props.handlePanelClick} style={{ marginTop: MARGIN_TOP }}>
        <CardBody
          style={{
            width: '100%',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        >
          {props.children}
        </CardBody>
      </Card>
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
