import React from 'react';
import moment from 'moment/moment';
import 'moment/locale/th';
import Card from 'antd/lib/card';
import { Icon } from 'react-fa';
import LazyLoad from 'react-lazyload';
import { PlaceHolder } from '../Shared/LazyLoadPlaceholder';

const LAZYLOAD_OFFSET = [600,600];

export default ({postId, typeId, categoryText = '', thumbnailUrl, title, forRent, project, postDate, district, ...props}) => {
    let sellingText = forRent ? 'ให้เช่า' : 'ขาย';
    let priceText = props.price.toLocaleString('thai', { style: 'decimal', minimumFractionDigits: 0 });
    let altenateCss = props.index % 2 ? 'altenate-item' : '';
    let haveRooms = typeId === 2 || typeId === 3 || typeId === 4;
    let isCondoForSale = typeId === 4 && !forRent;
    const imgStyle = { maxWidth: 200, minHeight:200, marginRight: 10, height: 'auto' };

    return (
        <Card hoverable
            className={altenateCss} 
            bodyStyle={{ padding: 10 }} 
            style={{ marginBottom: 5, cursor: 'default', borderRadius: '4px'}}>
            
            <div className="pull-left col-xs-12">
                <a href={`/post/${postId}`} title={title}>
                    <LazyLoad width={200} height={150} minHeight={150} offset={LAZYLOAD_OFFSET} debounce={100}
                        placeholder={<PlaceHolder />}>
                        <img 
                            className="img-propertylist"
                            style={imgStyle}
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
                    <span style={{ color: '#bb0000'}}>{`${sellingText} ${priceText} บาท`}</span>
                    {isCondoForSale && <ShowPricePerSqm area={props.area} price={props.price} />}
                    {haveRooms && <ShowRooms bed={props.bedRoom} bath={props.bathRoom} area={props.area} areaUnit={props.areaUnit} />}
                    <br />
                    <div className="text-muted">
                        <Icon name="clock-o" fixedWidth />{moment(postDate).fromNow()}
                    </div>
                    <div className="text-muted">
                        <Icon name="location-arrow" fixedWidth />เขต{district.districtName}
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

const ShowRooms = ({bed, bath, area, areaUnit}) => (
    <div className="pull-right">
        <span style={{ marginLeft:5 }}> 
            {bed} <Icon name="bed" fixedWidth style={{ marginRight: 10 }}/>
            {bath} <Icon name="bath" fixedWidth style={{ marginRight: 10 }}/>
            {area} {areaText(areaUnit)}
        </span>
    </div>
)

const ShowPricePerSqm = ({area, price}) => {
    const pricePerSqm = Math.floor(price / area);
    return (
        <span style={{ marginLeft:5 }}> 
            ({pricePerSqm.toLocaleString()}/ตรม)
        </span>
    );
}

const areaText = (areaUnit) => {
    switch (areaUnit) {
        case 1:
            return 'ตรว.';
        case 2:
            return 'ตรม.';
        case 3:
            return 'ไร่';
        default:
            break;
    }
}