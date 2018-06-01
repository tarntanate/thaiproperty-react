import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { forceCheck } from 'react-lazyload';
import Select from 'antd/lib/select';
import Slider from 'antd/lib/slider';
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
const LIMIT_POSTS_DISPLAY = 200;
const PAGESIZE = 10; // page size for infinite-scroll
const INFINITE_SCROLL_THRESHOLD = 200; // offset before reach bottom of the page
const INFINITE_SCROLL_DELAY = 1000;

class PostList extends Component {
    state = {
        posts: [], // store the filtered post list from redux store
        pagedPosts: [], // paginated posts
        typeId: null, // category type (eg. คอนโด, บ้าน)
        isForRent: null,
        bedRoom: null,
        district: [], // array of districtId
        minPrice: sessionStorage.getItem('options_slider_minprice') || 0,
        maxPrice: null,
        sliderMaxPrice: null,
        sliderStep: 2000,
        searchText: '',
        isLoading: false,  // this is local loading from search filter or sliding price limit
        hasMoreItems: true, // for infinite-scroll
        sortBy: null,
    };

    componentDidMount() {
        console.debug('PostList container componentDidMount()');
        this.fetchData(this.props.match.params);
    }
    
    // Triggers when recieving project list on redux store or changes in redux-router params
    UNSAFE_componentWillReceiveProps({ posts, error, match }) {
        const prevParams = this.props.match.params;
        const { categoryName, rent } = match.params;
        
        if (error) {
            openNotification({ message: 'Error loading data', description: error, type: 'error'});
        }

        if (prevParams.categoryName !== categoryName || prevParams.rent !== rent) {
            // there's changes in props.match.params (from redux-router)
            this.fetchData(match.params);
        }

        if (posts && posts.length > 0) {
            // Find that maximum price in post list, then set to Slider.
            const priceArr = posts.map(p => {
                return p.price > 50000000 ? 0 : p.price; // cut the higher price more than 50million off
            });
            let maxPrice = Math.max(...priceArr);
            this.setState({ 
                maxPrice,
                sliderMaxPrice: maxPrice,
                posts :  posts, //posts.slice(0, LIMIT_POSTS_DISPLAY),
                pagedPosts : posts.slice(0, PAGESIZE),
            });

            // Get options value from sessionStorage
            // sessionStorage always store data as String, so we have to explicitly convert to Number
            
            let _bedroom = sessionStorage.getItem('options_select_bedroom');
            const bedRoom = _bedroom != null ? Number(_bedroom) : null; // Convert value from String to Number, or null
            const savedMinPrice = sessionStorage.getItem('options_slider_minprice') || 0;
            const savedMaxPrice = sessionStorage.getItem('options_slider_maxprice') || maxPrice;
            console.log('savedMaxPrice=', savedMaxPrice);
            const options = { 
                bedRoom,
                minPrice : Number(savedMinPrice),
                maxPrice: Number(savedMaxPrice),
            };
            this.updatePosts(posts, options, false);
        }
    }

    fetchData({ categoryName, rent }) {
        // call redux action creator to get Posts data, then the posts data will receive via props (componentWillReceiveProps)
        this.props.requestPostList(categoryName, rent, LIMIT_POSTS_FROM_API);
        if (rent === 'rent') {
            this.setState({ sliderMaxPrice: 150000, minPrice:0, maxPrice: 150000, sliderStep: 2000 });
        } else {
            this.setState({ sliderMaxPrice: 25000000, maxPrice: 25000000, sliderStep: 100000 });
        }
    }

    onCategoryChange = (categoryName) => {
        const isForRent = this.state.isForRent || this.props.match.params.isForRent;
        if (isForRent) {
            this.props.history.push(`/list/${categoryName}/${isForRent}`);
        } else {
            this.props.history.push(`/list/${categoryName}`);
        }
    }

    onForRentChange = (isForRent) => {
        // User must select category before select isForRent
        const { categoryName } = this.props.match.params;
        if (categoryName) {
            this.setState({ isForRent });
            sessionStorage.removeItem('options_slider_minprice');
            sessionStorage.removeItem('options_slider_maxprice');
            this.props.history.push(`/list/${categoryName}/${isForRent}`);
        } else {
            openNotification({ 
                message: 'ต้องทำการเลือกประเภทอสังหาฯก่อน', 
                type: 'error',
                duration: 3,
            });
        }
    }

    onBedRoomChange = (bedRoom) => {
        if (bedRoom != null) { 
            bedRoom = Number(bedRoom);
            sessionStorage.setItem('options_select_bedroom', bedRoom);
        } else {
            bedRoom = null;
            sessionStorage.removeItem('options_select_bedroom');
        }

        const { district, minPrice, maxPrice } = this.state;
        const options = { bedRoom, district, minPrice, maxPrice };
        this.updatePosts(this.props.posts, options, true);
    }

    onDistrictChange = (districtIds = []) => {
        const district = districtIds.map(d => Number(d)); // Convert to array of int
        const { bedRoom, minPrice, maxPrice } = this.state;
        const options = { bedRoom, minPrice, maxPrice, district };
        this.updatePosts(this.props.posts, options);
    }

    onPriceFilterChanged = value => {
        const [ minPrice, maxPrice ]  = value;
        const { bedRoom, district } = this.state;
        const options = { minPrice, maxPrice, bedRoom, district };
        this.updatePosts(this.props.posts, options, false);
        sessionStorage.setItem('options_slider_minprice', minPrice);
        sessionStorage.setItem('options_slider_maxprice', maxPrice);
    };

    onSortChanged = sortBy => {
        const { bedRoom, district, minPrice, maxPrice } = this.state;
        const options = { bedRoom, district, minPrice, maxPrice, sortBy };
        this.updatePosts(this.props.posts, options);
    }

    sliderTooltipFormatter = value => {
        return value.toLocaleString('en', { maximumSignificantDigits: 3 });
    };

    // update this.state.posts to filtered with user select options from this.props.posts (redux) data
    updatePosts = (posts = [], options = {}, showLoader = true) => {
        // console.debug(options);
        if (showLoader) {
            this.setState({ isLoading: true });
        };

        let filtered = posts;
        let { district } = options;

        if (options.bedRoom != null) {
            filtered = filtered.filter(post => post.bedRoom === options.bedRoom);
        }

        if (district && district.length > 0) {
            filtered = filtered.filter(post => district.includes(post.district.districtId) )
        }

        if (options.maxPrice) {
            filtered = filtered.filter(post => post.price >= options.minPrice && post.price <= options.maxPrice);
        }

        if (options.sortBy) {
            let [ sortBy, asc ] = options.sortBy.split('_');
            asc = asc === 'asc';

            if (sortBy === 'price') {
                filtered = filtered.sort((a, b) => {
                    if (a.price < b.price) {
                        if (asc) return -1; 
                            else return 1;
                    }
                    if (a.price > b.price) {
                        if (asc) return 1;
                            else return -1;
                    }
                      // a must be equal to b
                    return 0;
                });
            }

            if (sortBy === 'date') {
                filtered = filtered.sort((a, b) => {
                    if (a.postId < b.postId) {
                        if (asc) return -1; 
                            else return 1;
                      }
                      if (a.postId > b.postId) {
                        if (asc) return -1;
                            else return 1;
                      }
                      // a must be equal to b
                      return 0;
                });
            }
        }

        this.setState({ 
            posts: filtered.slice(0, LIMIT_POSTS_DISPLAY),
            pagedPosts: filtered.slice(0, PAGESIZE),
            hasMoreItems: filtered.length > PAGESIZE,
            ...options
        });

        // Reset infinite-scroll paging
        if (this.infiniteScroll && this.infiniteScroll.pageLoaded) {
            // console.log('reset pageLoaded to 1 * from', this.infiniteScroll.pageLoaded);
            this.infiniteScroll.pageLoaded = 1;
        }
        setTimeout(() => this.setState({ isLoading: false }), 200);
        setTimeout(forceCheck, 500); // force lazy-load image to check even no-scrolling
    }

    loadMore = (pageNum) => {
        // console.debug('loadMore() pageNumber=', pageNum);
        --pageNum; // minus 1 for array index.
        let pagedPosts = this.state.posts.slice(pageNum * PAGESIZE, (pageNum + 1) * PAGESIZE);
        console.debug('pagedPosts.length =',pagedPosts.length);
        if (pagedPosts.length > 0) {
            // has posts in the next page
            setTimeout(() => {
                this.setState({ pagedPosts: this.state.pagedPosts.concat(pagedPosts) });
            }, INFINITE_SCROLL_DELAY);
        } else {
            // no more posts
            this.setState({ hasMoreItems: false });
        }
    }

    render() {
        if (this.props.isLoading) {
            return <Loading text="กำลังโหลดข้อมูล" className="m-5" />;
        }

        return (
            <div className="mt-3">
                {this.props.errorMessage && (
                    <ErrorMessage text={this.props.errorMessage} />
                )}
                <div className="control-zone" >
                    <Select size="large" dropdownMatchSelectWidth={false} placeholder="เลือกประเภท"
                        onChange={this.onCategoryChange}
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
                            value={this.state.isForRent === null ? this.props.match.params.rent : this.state.isForRent}
                            className="dropdown">
                        <Option value="sale">ขาย</Option>
                        <Option value="rent">ให้เช่า</Option>
                    </Select>
                    <Select size="large" dropdownMatchSelectWidth={false} placeholder="จำนวนห้องนอน" 
                        onChange={this.onBedRoomChange}
                        defaultValue={this.state.bedRoom}
                        className="dropdown" style={{minWidth:150}}>
                        <Option value={null}>ทุกแบบห้อง</Option>
                        <Option value={0}>ห้องสตูดิโอ</Option>
                        <Option value={1}>1 ห้องนอน</Option>
                        <Option value={2}>2 ห้องนอน</Option>
                        <Option value={3}>3 ห้องนอน</Option>
                        <Option value={4}>4 ห้องนอน</Option>
                    </Select>
                    <Select size="large" dropdownMatchSelectWidth={false} placeholder="เรียงตาม" 
                        onChange={this.onSortChanged}
                        className="dropdown" style={{minWidth:150}}>
                        <Option value="price_asc">ราคา น้อย-มาก</Option>
                        <Option value="price_desc">ราคา มาก-น้อย</Option>
                        <Option value="date_asc">วันที่ ล่าสุด-เก่า</Option>
                        <Option value="date_desc">วันที่ เก่า-ล่าสุด</Option>
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
                    <Slider
                        range 
                        style={{ width: '100%' }}
                        className="slider"
                        disabled={this.state.isLoading}
                        defaultValue={[this.state.minPrice, this.state.maxPrice]}
                        step={this.state.sliderStep}
                        max={this.state.sliderMaxPrice}
                        value={[this.state.minPrice, this.state.maxPrice]}
                        onChange={this.onPriceFilterChanged}
                        tipFormatter={this.sliderTooltipFormatter}
                        />
                </div>
                <div>
                    แสดงผลการค้นหา <span className="text-primary text-bold">{this.state.posts.length}</span> รายการ
                </div>
                {this.state.isLoading && <Loading text="" />}
                {!this.state.isLoading && 
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMoreItems}
                        initialLoad={false}
                        loader={<Loading key={0} />}
                        threshold={INFINITE_SCROLL_THRESHOLD}
                        useWindow={true}
                        ref={ (infiniteScroll) => { this.infiniteScroll = infiniteScroll; } }
                        >
                        <div key={1} className="list-container">
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