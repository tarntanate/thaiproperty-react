import React from 'react';

export default ({postId, typeId, categoryText = '', title, price, forRent, postDate}) => {
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-md-pull-8 col-lg-2 col-lg-pull-10 property-image">
            <a className="post" href="/post/{postId}" title={title}>
                <div className="img-propertylist">
                    <img 
                        className="img-propertylist" 
                        src="/image.aspx?f=332494_Logo_12876pic1.jpg&amp;size=320x240&amp;Quality=75" 
                        alt={title}
                    />
                </div>
            </a>
            <span class="overlay-text hidden-sm hidden-md hidden-lg">
                <a href="/post/{postId}" style={{color: 'white'}}>
                    {`${forRent} ${price}`}<br />
                    {`${forRent}${categoryText} ${price}`}
                </a>
                <br />
                <span>{postDate}</span>
            </span>
        </div>
    );
}