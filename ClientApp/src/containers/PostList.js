import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'antd/lib/select';

// import user libriers
import { actionCreators } from '../redux/actions/PostList';
import { openNotification } from '../components/Shared/Notification';
import { Spinner } from '../components/Shared/Spinner';
import { ErrorMessage } from '../components/Shared/ErrorMessage';
import Post from '../components/PostList/Post';

const LIMIT_POSTS_FROM_API = 100;
const Option = Select.Option;

class PostList extends Component {
    state = {
        posts: [], // store the filtered post list
        typeId: null, // category type (eg. คอนโด, บ้าน)
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

    onPostTypeChange = (typeId) => {
        const filteredPosts = this.props.posts.filter(post => {
            return post.typeId == typeId;
        });
        this.setState({ typeId, posts: filteredPosts});
    }

    onBedRoomChange = (number) => {
        const filteredPosts = this.props.posts.filter(post => {
            return post.bedRoom == number;
        });
        this.setState({ number, posts: filteredPosts});
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
                <div style={{marginTop:10, marginBottom:10}}>
                    <Select dropdownMatchSelectWidth={false} defaultValue="เลือกประเภท"
                        onChange={this.onPostTypeChange} 
                        style={{marginRight:10, width:150}}>
                        <Option value="2">บ้านเดี่ยว</Option>
                        <Option value="3">ทาวน์โฮม</Option>
                        <Option value="4">คอนโดมิเนียม</Option>
                        <Option value="5">ที่ดิน</Option>
                    </Select>
                    <Select dropdownMatchSelectWidth={false} defaultValue="จำนวนห้องนอน" 
                        onChange={this.onBedRoomChange}
                        style={{marginRight:10, width:150}}>
                        <Option value="1">1 ห้องนอน</Option>
                        <Option value="2">2 ห้องนอน</Option>
                        <Option value="3">3 ห้องนอน</Option>
                        <Option value="4">4 ห้องนอน</Option>
                    </Select>
                </div>
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
                            project={p.project}
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