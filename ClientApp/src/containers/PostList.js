import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { forceCheck } from 'react-lazyload';
import Select from 'antd/lib/select';
import InfiniteScroll from 'react-infinite-scroller';

// import user libriers
import { districtData } from '../components/Distict/Data';
import { actionCreators } from '../redux/actions/PostList';
import { openNotification } from '../components/Shared/Notification';
import { ErrorMessage } from '../components/Shared/ErrorMessage';
import { Loading } from '../components/Shared/Loading';
import Post from '../components/PostList/Post';

const Option = Select.Option;
const LIMIT_POSTS_FROM_API = 500;
const LIMIT_POSTS_DISPLAY = 100;
const PAGESIZE = 20;
const INFINITE_SCROLL_THRESHOLD = 200;
const INFINITE_SCROLL_DELAY = 2500;

class PostList extends Component {
    state = {
        posts: [], // store the filtered post list from redux store
        pagedPosts: [], // paginated posts
        typeId: null, // category type (eg. คอนโด, บ้าน)
        isForRent: null,
        bedRoom: null,
        district: [], // array of districtId
        minPrice: 0,
        maxPrice: null,
        searchText: '',
        isLoading: false,  // this is local loading from search filter or sliding price limit
        hasMoreItems: true, // for infinite-scroll
    };

    componentDidMount() {
        console.log('PostList container componentDidMount()');
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

        if (error) {
            openNotification({ message: 'Error loading data', description: error, type: 'error'});
        }

        if (posts && posts.length > 0) {
            this.setState({ 
                posts : posts.slice(0, LIMIT_POSTS_DISPLAY),
                pagedPosts : posts.slice(0, PAGESIZE),
            });
        }
    }

    getData({ categoryName, rent }) {
        // call redux action creator to get Posts data
        this.props.requestPostList(categoryName, rent, LIMIT_POSTS_FROM_API);
    }

    onPostTypeChange = (typeId) => {
        // redirect page
        this.props.history.push(`/list/${typeId}`);
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
        this.updatePosts(this.props.posts, options);
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
        this.updatePosts(this.props.posts, options);
    }

    // update this.state.posts[] to filtered from this.props.posts[]
    updatePosts = (posts = [], options = {}) => {
        this.setState({ isLoading: true });
        let filtered = posts;
        console.log('options=', options);

        if (options.bedRoom != null) {
            filtered = filtered.filter(post => post.bedRoom === options.bedRoom);
        }

        if (options.district.length > 0) {
            filtered = filtered.filter(post => options.district.includes(post.district.districtId) )
        }

        this.setState({ 
            posts: filtered.slice(0, LIMIT_POSTS_DISPLAY),
            pagedPosts: filtered.slice(0, PAGESIZE),
            hasMoreItems: filtered.length > PAGESIZE,
            ...options
        });
        if (this.scroll && this.scroll.pageLoaded) {
            console.log('reset infinite-scroll pageLoaded to 1');
            this.scroll.pageLoaded = 1;
        }
        setTimeout(() => this.setState({ isLoading: false }), 600);
        setTimeout(forceCheck, 500); // force lazy-load image to check even no-scrolling
    }

    loadMore = (pageNum) => {
        console.log('loadMore() from infinite-scroll');
        console.log('pageNumber=', pageNum);

        --pageNum; // minus 1 for array index.
        let pagedPosts = this.state.posts.slice(pageNum * PAGESIZE, (pageNum + 1) * PAGESIZE);
        console.log('pagedPosts.length =',pagedPosts.length);
        if (pagedPosts.length > 0) {
            console.log('has more data.. added to pagedPosts array');
            setTimeout(() => {
                console.log('setstate.. pagedPosts');
                this.setState({ pagedPosts: this.state.pagedPosts.concat(pagedPosts) });
            },
            INFINITE_SCROLL_DELAY);
        } else {
            // no more infinite-scroll loader
            console.log('no more infinite-scroll data, disable hasMoreItems.');
            this.setState({ hasMoreItems: false });
        }
    }
      
    render() {
        if (this.props.isLoading) {
            return <Loading text="กำลังโหลดข้อมูล" />;
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
                        <Option value="apartment">อพาร์ทเมนท์</Option>
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
                {this.state.isLoading && <Loading text="" />}
                {!this.state.isLoading && 
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMoreItems}
                        initialLoad={false}
                        loader={<Loading />}
                        threshold={INFINITE_SCROLL_THRESHOLD}
                        useWindow={true}
                        ref={ (scroll) => { this.scroll = scroll; } }
                        >
                        <div>
                        {this.state.pagedPosts.map((p, index) => (
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
                    </InfiniteScroll>
                }
            </div>
        );
    }
}

export default connect(
    // map the state from redux store (postList) into props
    state => state.posts,
    dispatch => bindActionCreators(actionCreators, dispatch))(PostList);