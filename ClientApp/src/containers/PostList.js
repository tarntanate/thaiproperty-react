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
import { districtData } from '../components/Distict/Data';
// import { CenterContent } from '../components/Shared/CenterContent';

const LIMIT_POSTS_FROM_API = 100;
const Option = Select.Option;

class PostList extends Component {
    state = {
        posts: [], // store the filtered post list
        typeId: null, // category type (eg. คอนโด, บ้าน)
        isForRent: null,
        bedRoom: null,
        district: [], // array of districtId
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
            this.setState({ posts : posts.slice(0, 50) });
        //   this.state.showInitialMessage && this.showTotalNumberOfProjects(posts.length);
        }
    }

    onPostTypeChange = (typeId) => {
        typeId = Number(typeId);
        const options = {
            typeId,
            isForRent: this.state.isForRent,
            bedRoom: this.state.bedRoom,
            district: this.state.district,
        }
        const posts = this.filteredPosts(this.props.posts, options);
        this.setState({ typeId, posts});
    }

    onDistrictChange = (district = []) => {
        const arrDistrict = district.map(d => Number(d)); // Convert to array of int
        const options = {
            typeId: this.state.typeId,
            isForRent: this.state.isForRent,
            bedRoom: this.state.bedRoom,
            district: arrDistrict,
        }
        const posts = this.filteredPosts(this.props.posts, options);
        this.setState({ district: arrDistrict, posts});
    }

    onBedRoomChange = (bedRoom) => {
        if (!bedRoom) { 
            bedRoom = null;
        } else {
            bedRoom = Number(bedRoom);
        }

        const options = {
            typeId: this.state.typeId,
            isForRent: this.state.isForRent,
            bedRoom,
            district: this.state.district,
        }
        const posts = this.filteredPosts(this.props.posts, options);
        this.setState({ bedRoom, posts });
    }

    onForRentChange = (isForRent) => {
        isForRent = Boolean(Number(isForRent));
        const options = {
            typeId: this.state.typeId,
            isForRent,
            bedRoom: this.state.bedRoom,
            district: this.state.district,
        }
        const posts = this.filteredPosts(this.props.posts, options);
        this.setState({ isForRent, posts });
    }

    filteredPosts = (posts, { typeId, isForRent, bedRoom, district = [] }) => {
        let filtered;
        if (typeId != null) {
            filtered = posts.filter(post => post.typeId === Number(typeId));
        } else {
            filtered = posts; // All Category
        };

        if (isForRent != null) {
            filtered = filtered.filter(post => post.isForRent === Boolean(isForRent));
        }

        if (bedRoom != null) {
            filtered = filtered.filter(post => post.bedRoom === Number(bedRoom));
        }

        if (district.length > 0) {
            console.log(district);
            filtered = filtered.filter(post =>  district.includes(post.district.districtId) )
        }

        return filtered;
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
                <div className="control-zone" >
                    <Select size="large" dropdownMatchSelectWidth={false} placeholder="เลือกประเภท"
                        onChange={this.onPostTypeChange} 
                        className="dropdown">
                        <Option value="2">บ้านเดี่ยว</Option>
                        <Option value="3">ทาวน์โฮม</Option>
                        <Option value="4">คอนโดมิเนียม</Option>
                        <Option value="5">ที่ดิน</Option>
                    </Select>
                    <Select size="large" dropdownMatchSelectWidth={false} placeholder="ขาย/ให้เช่า" 
                        onChange={this.onForRentChange}
                        className="dropdown">
                        <Option value="0">ขาย</Option>
                        <Option value="1">ให้เช่า</Option>
                    </Select>
                    <Select size="large" dropdownMatchSelectWidth={false} placeholder="จำนวนห้องนอน" 
                        onChange={this.onBedRoomChange}
                        className="dropdown" style={{minWidth:150}}>
                        <Option value="">ไม่ระบุ</Option>
                        <Option value="0">ห้องสตูดิโอ</Option>
                        <Option value="1">1 ห้องนอน</Option>
                        <Option value="2">2 ห้องนอน</Option>
                        <Option value="3">3 ห้องนอน</Option>
                        <Option value="4">4 ห้องนอน</Option>
                    </Select>
                    <Select
                        mode="multiple" size="large"
                        onChange={this.onDistrictChange}
                        className="dropdown"
                        placeholder="เลือกเขต"
                        >
                        {districtData.map(d => (
                            <Option key={d.id} value={d.id}>{d.name}</Option>
                        ))}
                    </Select>
                </div>
                {this.state.posts.map((p, index) => (
                    <Post
                        key={p.postId}
                        index={index}
                        postId={p.postId}
                        categoryId={p.typeId}
                        title={p.title}
                        price={p.price}
                        forRent={p.isForRent}
                        totalView={p.totalView}
                        thumbnailUrl={p.thumbnailUrl}
                        postDate={p.postDate}
                        project={p.project}
                        bedRoom={p.bedRoom}
                        bathRoom={p.bathRoom}
                        area={p.area}
                        areaUnit={p.areaUnit}
                        district={p.district}>
                    </Post>
                ))}
            </div>
        );
    }
}

export default connect(
    // map the state from redux store (postList) into props
    state => state.posts,
    dispatch => bindActionCreators(actionCreators, dispatch))(PostList);