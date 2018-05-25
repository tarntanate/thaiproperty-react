import React from 'react';
import moment from 'moment/moment';
import 'moment/locale/th';
import Card from 'antd/lib/card';

export default ({postId, typeId, categoryText = '', thumbnailUrl, title, price, forRent, postDate}) => {
    return (
        <Card className="postItem" style={{ marginBottom: 5}}>
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
                <a href="/post/{postId}" title={title}>
                   {title}
                </a>
                {`${forRent}${categoryText} ${price}`}
                <br />
                <span>{moment(postDate).fromNow()}</span>
            </span>
        </Card>
    );
}