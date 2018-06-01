import React from 'react';
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';

const customIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const defaultClass = 'loader m-3 text-center';

export const Loading = ({text = 'Loading more data...', className, ...props}) => (
    <div className={[defaultClass, className].join(' ')} >
        <Spin indicator={customIcon} style={{ marginRight: 10 }} />{text}
    </div>
);