import React from 'react';
import moment from 'moment/moment';
import 'moment/locale/th';
import Card from 'antd/lib/card';
import { Icon } from 'react-fa';

export default ({postId, typeId, categoryText = '', thumbnailUrl, title, forRent, project, postDate, ...props}) => {
    let sellingText = forRent ? 'ให้เช่า' : 'ขาย';
    let price = props.price.toLocaleString('thai', { style: 'decimal', minimumFractionDigits: 0 });
    let altenateCss = props.index % 2 ? 'altenate-item' : '';

    return (
        <Card className={altenateCss} bodyStyle={{ padding: 10 }} hoverable
            style={{ marginBottom: 5, cursor: 'default'}}>
            <a className="postTitle" 
                href={`/post/${postId}`} 
                title={title} 
                style={{ fontWeight: 'bold', fontSize: '1.2em'}}>
                {title}
            </a>
            <div>
                <a href={`/post/${postId}`} title={title}>
                    <img 
                        className="img-propertylist"
                        style={{ maxWidth: 200, height: 'auto'}}
                        src={thumbnailUrl} 
                        alt={title}
                    />
                </a>
            </div>
            <span className="">
                {props.bedRoom} <Icon name="bed" fixedWidth />
                {props.bathRoom} <Icon name="bath" fixedWidth />
                {sellingText} 
                {price}
                <br />
                <span><Icon name="clock-o" fixedWidth className="text-muted" />{moment(postDate).fromNow()}</span>
                {project && 
                    <div><Icon name="map-marker" fixedWidth className="text-muted" /><a href={`/project/${project.projectId}`}>{project.projectName}</a></div>}
            </span>
        </Card>
    );
}