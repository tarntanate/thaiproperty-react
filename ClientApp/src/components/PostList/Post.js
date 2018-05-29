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
    let haveRooms = typeId === 2 || typeId === 3 || typeId === 4;

    return (
        <Card hoverable
            className={altenateCss} 
            bodyStyle={{ padding: 10 }} 
            style={{ marginBottom: 5, cursor: 'default', borderRadius: '4px'}}>
            
            <div className="pull-left col-xs-12">
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
            <div className="col-xs-12">
                <a className="text-secondary" 
                    href={`/post/${postId}`} 
                    title={title} 
                    style={{ fontWeight: 'bold', fontSize: '1.2em'}}>
                    {title}
                </a>
                <br/>
                <span className="">
                    {`${sellingText} ${price} บาท`} 
                    {haveRooms && <ShowRooms bed={props.bedRoom} bath={props.bathRoom} />}
                    <br />
                    <div className="text-muted">
                        <Icon name="clock-o" fixedWidth />{moment(postDate).fromNow()}
                    </div>
                    <div className="text-muted">
                        <Icon name="map-marker" fixedWidth />เขต{district.districtName}
                    </div>
                    {project && 
                        <div>
                            <Icon name="map-marker" fixedWidth  />
                            <a href={`/project/${project.projectId}`}>{project.projectName}</a>
                        </div>}
                </span>
            </div>
        </Card>
    );
}

const ShowRooms = ({bed, bath}) => (
    <div className="pull-right">
        <span style={{ marginLeft:5 }}> 
            {bed} <Icon name="bed" fixedWidth style={{ marginRight: 10 }}/>
            {bath} <Icon name="bath" fixedWidth style={{ marginRight: 10 }}/>
        </span>
    </div>
)