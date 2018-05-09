import React from 'react';
import Alert from 'antd/lib/alert';

// a re-usable presentation component for showing error message.
export const ErrorMessage = ({text}) => (
  <div style={{ margin: 20 }}>
    <Alert message="มีข้อผิดพลาด" description={text} type="error" showIcon />
  </div>
);