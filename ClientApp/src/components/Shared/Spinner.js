import React from 'react';
import Spin from 'antd/lib/spin';

export const Spinner = ({size = 'large', style}) => (
  <Spin size={size} style={style} />
)