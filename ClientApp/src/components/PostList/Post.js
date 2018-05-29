import React from 'react';
import moment from 'moment/moment';
import 'moment/locale/th';
import Card from 'antd/lib/card';
import { Icon } from 'react-fa';
import LazyLoad from 'react-lazyload';
import { Spinner } from '../Shared/Spinner';

export default ({postId, typeId, categoryText = '', thumbnailUrl, title, forRent, project, postDate, district, ...props}) => {
    let sellingText = forRent ? 'ให้เช่า' : 'ขาย';
    let price = props.price.toLocaleString('thai', { style: 'decimal', minimumFractionDigits: 0 });
    let altenateCss = props.index % 2 ? 'altenate-item' : '';

    return (
        <Card className={altenateCss} bodyStyle={{ padding: 10 }} hoverable
            style={{ marginBottom: 5, cursor: 'default', borderRadius: '4px'}}>
            <a className="text-secondary" 
                href={`/post/${postId}`} 
                title={title} 
                style={{ fontWeight: 'bold', fontSize: '1.2em'}}>
                {title}
            </a>
            <div>
                <a href={`/post/${postId}`} title={title}>
                    <LazyLoad width={200} height={150} minHeight={150} offset={150} debounce={200}
                        placeholder={<div style={{margin:20}}>
                                        <Spinner size="small" style={{marginRight:10}}/> 
                                        <span className="text-muted">Loading image...</span>
                                    </div>}>
                        <img 
                            className="img-propertylist"
                            style={{ maxWidth: 200, minHeight:200, height: 'auto'}}
                            src={thumbnailUrl} 
                            alt={title}
                        />
                    </LazyLoad>
                </a>
            </div>
            <span className="">
                {`${sellingText} ${price}`} - 
                <span style={{ marginLeft:5 }}> 
                    {props.bedRoom} <Icon name="bed" fixedWidth style={{ marginRight: 10 }}/>
                    {props.bathRoom} <Icon name="bath" fixedWidth style={{ marginRight: 10 }}/>
                </span>
                <br />
                <div className="text-muted">
                    <Icon name="clock-o" fixedWidth />{moment(postDate).fromNow()} ({moment(postDate).toString()})
                </div>
                <div className="text-muted">
                    <Icon name="marker" fixedWidth />เขต{district.districtName}
                </div>
                {project && 
                    <div>
                        <Icon name="map-marker" fixedWidth  />
                        <a href={`/project/${project.projectId}`}>{project.projectName}</a>
                    </div>}
            </span>
        </Card>
    );
}