import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import user libriers
import { actionCreators } from '../redux/actions/PostList';
import { openNotification } from '../components/Shared/Notification';
import { Spinner } from '../components/Shared/Spinner';
import { ErrorMessage } from '../components/Shared/ErrorMessage';
import Post from '../components/PostList/Post';

const LIMIT_POSTS_FROM_API = 50;

class PostList extends Component {
    state = {
        posts: [], // store the filtered post list
        minPrice: 0,
        maxPrice: null,
        searchText: '',
        isLoading: false, // this is local loading from search filter or sliding price limit
    };

    componentDidMount() {
        // call redux action creator
        const { posts } = this.props;
        if (posts.length === 0) {
          this.props.requestPostList(LIMIT_POSTS_FROM_API);
        } else {
          // if props.posts already has data,
          // so redux has already fetched data (user might has visited this page)
          this.setState({ posts });
        }
      }
    
      UNSAFE_componentWillReceiveProps({ posts, error }) {
        // Triggers when recieving project list on redux store as a props
        // Destructing 'projects' and 'errorMessage' object from nextProps
        if (error) {
          openNotification({ message: 'Error loading data', description: error, type: 'error'});
        }
    
        if (posts && posts.length > 0) {
          // call after successfully fetched data
          this.setState({ posts });
        //   this.state.showInitialMessage && this.showTotalNumberOfProjects(posts.length);
        }
      }
      
    render() {
        if (this.props.isLoading) {
            return (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                กำลังโหลดข้อมูล... <br />
                <br />
                <Spinner />
              </div>
            );
        }

        return (
            <div>
                {this.props.errorMessage && (
                    <ErrorMessage text={this.props.errorMessage} />
                )}
                {
                    this.state.posts.map(p => (
                        <Post
                            key={p.postId}
                            postId={p.postId}
                            categoryId={p.typeId}
                            title={p.title}
                            price={p.price}
                            forRent={p.isForRent}
                            totalView={p.totalView}
                            thumbnailUrl={p.thumbnailUrl}
                            postDate={p.postDate}
                        >
                        </Post>
                    ))
                }
            </div>
        );
    }
}

export default connect(
    // map the state from redux store (postList) into props
    state => state.posts,
    dispatch => bindActionCreators(actionCreators, dispatch))(PostList);