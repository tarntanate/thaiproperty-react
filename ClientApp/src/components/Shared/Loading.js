import React from 'react';
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';

const customIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const Loading = () => (
    <div className="loader m-3 text-center">
        <Spin indicator={customIcon} style={{ marginRight: 10 }} /> Loading more data...
    </div>
);