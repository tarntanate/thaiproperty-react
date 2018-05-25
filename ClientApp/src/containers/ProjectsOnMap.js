import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from 'antd/lib/input';
import Slider from 'antd/lib/slider'

// import user libriers
import GoogleMapWithMarkerClusterer from '../components/GoogleMapHoc/GoogleMapWithMarkerClusterer';
import { actionCreators } from '../redux/actions/ProjectList';
import { openNotification } from '../components/Shared/Notification';
import { Spinner } from '../components/Shared/Spinner';
import { ErrorMessage } from '../components/Shared/ErrorMessage';
import { GOOGLE_MAP_DEFAULT_CENTER } from '../config.js';

// local configuration value
const MAX_PROJECT_AVG_PRICE_PER_SQM = 350000;
const SLIDER_AVG_PRICE_STEP = 10000;
const LIMIT_PROJECTS_SHOW_ON_MAP = 150; // for performance reason of Google Map on rendering too many markers
const LIMIT_PROJECTS_FROM_API = 100; // too much results will increase in API loading time and more memory usage

class ProjectOnMap extends Component {
    state = {
        projectList: [], // store the filtered projects list
        currentLocation: GOOGLE_MAP_DEFAULT_CENTER, // init default map position, then get from geolocation api later if user is allow
        minAvgPrice: 0,
        maxAvgPrice: MAX_PROJECT_AVG_PRICE_PER_SQM,
        searchText: '',
        isLoading: false, // this is local loading from search filter or sliding price limit
        showInitialMessage: true, // this option use to show notification on initial page load
    };

  componentDidMount() {
    // call redux action creator
    const { projects } = this.props;
    if (projects.length === 0) {
      this.props.requestProjectList(LIMIT_PROJECTS_FROM_API);
    } else {
      // visit this page second time or redux has already fetched data
      this.setState({ projectList: projects.slice(0, LIMIT_PROJECTS_SHOW_ON_MAP) });
    }
  }

  UNSAFE_componentWillReceiveProps({ projects, errorMessage }) {
    // Triggers when recieving project list on redux store as a props
    // Destructing 'projects' and 'errorMessage' object from nextProps
    if (errorMessage) {
      openNotification({ message: 'Error loading data', description: errorMessage, type: 'error', duration: 8 });
    }

    if (projects && projects.length > 0) {
      // call after successfully fetched data
      this.setState({ projectList: projects.slice(0, LIMIT_PROJECTS_SHOW_ON_MAP) });
      this.state.showInitialMessage && this.showTotalNumberOfProjects(projects.length);
    }
  }

  componentWillUnmount() {
    // Clear or reset any redux state (if any) when navigate away from this page.
    console.log('ProjectOnMap Unmount');
  }

  showTotalNumberOfProjects(totalProjects) {
    if (totalProjects > LIMIT_PROJECTS_SHOW_ON_MAP) {
      // show notification about limiting projects show on map
      this.delayedNotification(
        `จำกัดการแสดงผลโครงการคอนโดบนแผนที่สูงสุดไม่เกิน ${LIMIT_PROJECTS_SHOW_ON_MAP} โครงการ (จากทั้งหมด ${totalProjects} โครงการ)`,
      );
    } else {
      this.delayedNotification(`แสดงรายการโครงการคอนโดทั้งหมด ${totalProjects} โครงการ`);
    }
  }

  delayedNotification(message) {
    setTimeout(() => {
      // clearTimeout();
      openNotification({ message });
    }, 200);
  }

  getCurrentUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });

        const msg = `ตำแหน่งของคุณตอนนี้ Lat: ${coords.latitude}, Lng: ${coords.longitude}`;
        console.debug(msg);
        openNotification(msg);
        openNotification('แสดงแผนที่ในบริเวณพิกัดของคุณ');
      },
      err => {
        openNotification('ไม่สามารถอ่านตำแหน่งพิกัดได้', 'error');
        openNotification('หากต้องการให้แสดงตำแหน่งของคุณบนแผนที่ กรุณากด Allow', 'error');
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
    );
  };

  setMapToLocation(lat, lng) {
    this.setState({
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    });
  }

  sliderTooltipFormatter = value => {
    return value.toLocaleString('en', { maximumSignificantDigits: 3 });
  };

  onProjectNameSearch = e => {
    this.setState({
      searchText: e.target.value,
      minAvgPrice: 0,
      maxAvgPrice: MAX_PROJECT_AVG_PRICE_PER_SQM,
    });
    const searchText = e.target.value.toLowerCase();

    // filtered data from redux store
    const filteredProjects = this.props.projects.filter(
      project =>
        project.location.lat != null &&
        (project.projectName.toLowerCase().indexOf(searchText) >= 0 ||
          (project.projectNameEn && project.projectNameEn.toLowerCase().indexOf(searchText) >= 0)),
    );
    console.debug('filteredProject=', filteredProjects);

    this.setProjectListToStateWithLimitResult(filteredProjects, LIMIT_PROJECTS_SHOW_ON_MAP);
  };

  onPriceFilterChanged = value => {
    const minAvgPrice = value[0];
    const maxAvgPrice = value[1];

    // reset the searchText on sliding
    this.setState({ isLoading: true, minAvgPrice, maxAvgPrice, searchText: '' });

    const filteredProjects = this.props.projects
      .filter(
        project =>
          project.location.lat != null &&
          project.avgPricePerArea > minAvgPrice &&
          project.avgPricePerArea < maxAvgPrice,
      )
      .slice(0, LIMIT_PROJECTS_SHOW_ON_MAP);
    this.setState({
      projectList: filteredProjects,
      minAvgPrice,
      maxAvgPrice,
    });

    // set a minimum time to show loading message/spinner
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 500);
  };

  onProjectMarkerClicked = ({ projectId, projectName, projectNameEn, avgPricePerArea }) => {
    console.log('projectId =', projectId);
    let formattedPrice = avgPricePerArea.toLocaleString('en', { maximumSignificantDigits: 3 });
    let message = `โครงการ ${projectName}`;
    let description = `ราคาเฉลี่ย ${formattedPrice}/ตรม.`;
    openNotification({ message, description });
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          Loading condominium projects and map... <br />
          <br />
          <Spinner />
        </div>
      );
    }

    return (
      <div style={{ margin: '5px' }}>
        {this.props.errorMessage && (
          <ErrorMessage text={this.props.errorMessage} />
        )}
        {!this.props.errorMessage && (
          <div style={{ marginLeft: '20px', marginRight: '20px' }}>
            <h3 className="h4">กรองการค้นหาจากชื่อโครงการ หรือช่วงราคาต่อตารางเมตร</h3>
            <div>
              <Input
                type="text"
                size="large"
                placeholder="ใส่ชื่อโครงการที่ต้องการค้นหา"
                value={this.state.searchText}
                onChange={e => this.setState({ searchText: e.target.value })}
                onPressEnter={e => this.onProjectNameSearch(e)}
              />
            </div>
            <Slider
              range
              disabled={this.state.isLoading}
              defaultValue={[0, MAX_PROJECT_AVG_PRICE_PER_SQM]}
              step={SLIDER_AVG_PRICE_STEP}
              max={MAX_PROJECT_AVG_PRICE_PER_SQM}
              value={[this.state.minAvgPrice, this.state.maxAvgPrice]}
              tipFormatter={this.sliderTooltipFormatter}
              onChange={this.onPriceFilterChanged}
            />
            <div>
              {this.state.minAvgPrice !== null && (
                <span>
                  แสดงราคาต่อตารางเมตร ระหว่าง {this.state.minAvgPrice.toLocaleString()} ถึง{' '}
                  {this.state.maxAvgPrice.toLocaleString()}
                  &nbsp;มีทั้งหมด <strong style={{ color: 'darkgreen' }}>{this.state.projectList.length}</strong>{' '}
                  โครงการ
                </span>
              )}
              {this.state.isLoading && (
                <span style={{ fontStyle: 'italic' }}>
                  <Spinner size="small" style={{ marginLeft: '10px', marginRight: '10px' }} />กำลังอัพเดตแผนที่...
                </span>
              )}
            </div>
          </div>
        )}
        <GoogleMapWithMarkerClusterer
          markers={this.state.projectList}
          currentLocation={this.state.currentLocation}
          onProjectClicked={this.onProjectMarkerClicked}
        />
      </div>
    );
  }
}

export default connect(
  // map the state from redux store (projectList) into props
  state => state.projects,
  dispatch => bindActionCreators(actionCreators, dispatch))(ProjectOnMap);
