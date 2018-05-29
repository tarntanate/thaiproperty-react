import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'antd/lib/select';
import { forceCheck } from 'react-lazyload';


// import user libriers
import { actionCreators } from '../redux/actions/PostList';
import { openNotification } from '../components/Shared/Notification';
import { Spinner } from '../components/Shared/Spinner';
import { ErrorMessage } from '../components/Shared/ErrorMessage';
import Post from '../components/PostList/Post';
import { districtData } from '../components/Distict/Data';
// import { CenterContent } from '../components/Shared/CenterContent';

const LIMIT_POSTS_FROM_API = 500;
const LIMIT_POSTS_DISPLAY = 100;
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
        console.log('PostList container componentDidMount()');
        console.log(this.props);
        this.getData(this.props.match.params);
    }
    

    // Triggers when recieving project list on redux store or changes in redux-router params
    UNSAFE_componentWillReceiveProps({ posts, error, match }) {
        const prevParams = this.props.match.params;
        const { categoryName, rent } = match.params;

        if (prevParams.categoryName !== categoryName || prevParams.rent !== rent) {
            // there's changes in props.match.params (from redux-router)
            this.getData(match.params);
        }
        // Destructing 'posts' and 'errorMessage' object from nextProps
        if (error) {
            openNotification({ message: 'Error loading data', description: error, type: 'error'});
        }

        if (posts && posts.length > 0) {
            this.setState({ posts : posts.slice(0, LIMIT_POSTS_DISPLAY) });
        }
    }

    getData({ categoryName, rent }) {
        // console.log(categoryName);
        // console.log(rent);
        // call redux action creator to get Posts data
        this.props.requestPostList(categoryName, rent, LIMIT_POSTS_FROM_API);
    }

    onPostTypeChange = (typeId) => {
        // typeId = Number(typeId);{{
        this.props.history.push(`/list/${typeId}`);
        // const options = {
        //     typeId,
        //     isForRent: this.state.isForRent,
        //     bedRoom: this.state.bedRoom,
        //     district: this.state.district,
        // }
        // const posts = this.filteredPosts(this.props.posts, options);
        // this.setState({ typeId, posts});
    }

    onForRentChange = (isForRent) => {
        const { categoryName } = this.props.match.params;
        this.props.history.push(`/list/${categoryName}/${isForRent}`);
        // isForRent = Boolean(Number(isForRent));
        // const options = {
        //     typeId: this.state.typeId,
        //     isForRent,
        //     bedRoom: this.state.bedRoom,
        //     district: this.state.district,
        // }
        // const posts = this.filteredPosts(this.props.posts, options);
        // this.setState({ isForRent, posts });
    }

    onDistrictChange = (district = []) => {
        const arrDistrict = district.map(d => Number(d)); // Convert to array of int
        const options = {
            // typeId: this.state.typeId,
            // isForRent: this.state.isForRent,
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
            // typeId: this.state.typeId,
            // isForRent: this.state.isForRent,
            bedRoom,
            district: this.state.district,
        }
        const posts = this.filteredPosts(this.props.posts, options);
        this.setState({ bedRoom, posts });
    }

    filteredPosts = (posts, { typeId, isForRent, bedRoom, district = [] }) => {
        let filtered = posts;
        // if (typeId != null) {
        //     filtered = posts.filter(post => post.typeId === Number(typeId));
        // } else {
        //     filtered = posts; // All Category
        // };

        // if (isForRent != null) {
        //     filtered = filtered.filter(post => post.isForRent === Boolean(isForRent));
        // }

        if (bedRoom != null) {
            filtered = filtered.filter(post => post.bedRoom === Number(bedRoom));
        }

        if (district.length > 0) {
            filtered = filtered.filter(post =>  district.includes(post.district.districtId) )
        }
        setTimeout(forceCheck, 300); // force lazy-load image to check even no-scrolling
        return filtered.slice(0, LIMIT_POSTS_DISPLAY);
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
                        defaultValue={this.props.match.params.categoryName}
                        className="dropdown">
                        <Option value="condo">คอนโดมิเนียม</Option>
                        <Option value="house">บ้านเดี่ยว</Option>
                        <Option value="townhome">ทาวน์โฮม</Option>
                        <Option value="land">ที่ดิน</Option>
                        <Option value="building">ตึกแถว/อาคารพานิชย์</Option>
                        <Option value="office">อาคารสำนักงาน</Option>
                        <Option value="aparment">อพาร์ทเมนท์</Option>
                    </Select>
                    <Select size="large" dropdownMatchSelectWidth={false} placeholder="ขาย/ให้เช่า" 
                        onChange={this.onForRentChange}
                        defaultValue={this.props.match.params.rent}
                        className="dropdown">
                        <Option value="sale">ขาย</Option>
                        <Option value="rent">ให้เช่า</Option>
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
                        allowClear={true}
                        optionFilterProp="title"
                        onChange={this.onDistrictChange}
                        className="dropdown"
                        placeholder="เลือกเขต"
                        style={{minWidth: '100%'}}
                        >
                        {districtData.map(d => (
                            <Option key={d.id} value={d.id} title={d.name}>{d.name}</Option>
                        ))}
                    </Select>
                </div>
                <div>
                    แสดงผลการค้นหา {this.state.posts.length} รายการ
                </div>
                {this.state.posts.map((p, index) => (
                    <Post
                        key={p.postId}
                        index={index}
                        typeId={p.typeId}
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