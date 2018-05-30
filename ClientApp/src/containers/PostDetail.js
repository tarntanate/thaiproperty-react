import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'antd/lib/card';
import { getApiServerUrl } from '../config';
import { Loading } from '../components/Shared/Loading';
import ImageGallery from 'react-image-gallery';

class PostDetail extends Component {
    state = {
        post: {},
        isLoading: true,
        error: null,
    }

    componentDidMount() {
        console.log(this.props.match.params);
        this.getPostData(this.props.match.params.id);
    }
    
    getPostData = async postId => {
        try {
            const apiUrl = `${getApiServerUrl()}/posts/${postId}`;
            console.log(apiUrl);
            const response = await fetch(apiUrl);
            const post = await response.json();
            let error = null;
            if (!response.ok) {
                this.setState({ isLoading: false });
                error = `Error loading data: ${response.status} - ${response.statusText}`;
                throw Error(error);
            }
            console.log(post);
            setTimeout(() => {
                this.setState({ post, isLoading: false });
            }, 400);
        } catch (err) {
            this.setState({
                error: `Error loading data: ${err.message}`,
                isLoading: false,
            });
        }
    }

    render() {
        const post = this.state.post;
        if (this.state.isLoading) {
            return (
                <React.Fragment>
                    <Loading text="loading..." />    
                </React.Fragment>
            )
        }

        const imageHost = "http://www.thaiproperty.in.th/image.aspx?f=";
        const propImages = post.propImages.map(img => ({
            original: imageHost + img.imageFileName,
            thumbnail: `${imageHost}${img.imageFileName}&size=150x150`,
        }));

        const logoImage = [{
                original: imageHost + post.logoImageFile,
                thumbnail : `${imageHost}${post.logoImageFile}&size=150x150`,
            }];

        const images = [...logoImage, ...propImages];

        console.log(images);

        return (
            <div>
                <Card title={post.title}>
                    <ImageGallery 
                        items={images} 
                        lazyLoad={true}
                        thumbnailClass="gallery-xxxxx"
                        thumbnailPosition="bottom"
                        swipeThreshold={20} 
                        showPlayButton={false} showFullscreenButton={false}
                        showIndex />
                    <div 
                        className="details" 
                        dangerouslySetInnerHTML={{__html: post.details.replace(/(<? *script)/gi, 'illegalscript')}} >
                    </div>
                </Card>
            </div>
        );
    }
}

export default connect()(PostDetail);
