import React from 'react';
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';

const customIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const Loading = ({text = 'Loading more data...'}) => (
    <div className="loader m-3 text-center">
        <Spin indicator={customIcon} style={{ marginRight: 10 }} />{text}
    </div>
);