import React from 'react';
import moment from 'moment/moment';
import 'moment/locale/th';
import Card from 'antd/lib/card';

export default ({postId, typeId, categoryText = '', thumbnailUrl, title, forRent, project, postDate, ...props}) => {
    let sellingText = forRent ? 'ให้เช่า' : 'ขาย';
    let price = props.price.toLocaleString('thai', { style: 'decimal', minimumFractionDigits: 0 });

    return (
        <Card className="postItem" style={{ marginBottom: 5}} hoverable>
            <a className="postTitle" 
                href={`/post/${postId}`} 
                title={title} 
                style={{ fontWeight: 'bold', fontSize: '1.5rem'}}>
                {title}
            </a>
            <a href={`/post/${postId}`} title={title}>
                <div className="img-propertylist">
                    <img 
                        className="img-propertylist" 
                        src={thumbnailUrl} 
                        alt={title}
                    />
                </div>
            </a>
            <span className="">
                
                {`${sellingText} ${price}`}
                <br />
                <span>เมื่อ {moment(postDate).fromNow()}</span>
                {project && 
                    <div><a href={`/project/${project.projectId}`}>{project.projectName}</a></div>}
            </span>
        </Card>
    );
}