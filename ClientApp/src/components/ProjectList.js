import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Spin, Slider } from 'antd';
import _ from 'lodash';

// import user libriers
import { actionCreators } from '../reducers/ProjectList';
import GoogleMapWithMarkerClusterer from './GoogleMapHoc/GoogleMapWithMarkerClusterer';
import { openNotification } from '../components/Shared/Notification';
import { GOOGLE_MAP_DEFAULT_CENTER } from '../config.js';

const MAX_PROJECT_AVG_PRICE_PER_SQM = 350000;
const SLIDER_AVG_PRICE_STEP = 10000;
const LIMIT_PROJECTS_SHOW_ON_MAP = 100; // for performance reason of Google Map rendering too much markers

class ProjectList extends Component {
  state = {
    projectList: [], // store the complete projects list from API
    currentLocation: GOOGLE_MAP_DEFAULT_CENTER, // init default map position, then get from geolocation api later if user is allow
    minAvgPrice: 0,
    maxAvgPrice: MAX_PROJECT_AVG_PRICE_PER_SQM,
    searchText: '',
    isLoading: false, // this is local loading from search filter or sliding price limit
    showInitialMessage: true, // this allow to show notification only one time
  };

  componentWillMount() {
    const limitRecordsFromAPI = 250; // too much results will increase in API loading time and more memory usage
    this.props.requestProjectList(limitRecordsFromAPI); // call redux action 'requestProjectList'
  }

  componentWillReceiveProps({ projectList }) {
    // Triggers when recieving project list on redux store as a props
    // Destructing projectList from nextProps
    if (projectList) {
      this.setProjectListToStateWithLimitResult(projectList);
    }
    if (this.state.projectList.length > 0 && projectList) {
      this.showNumberOfProjectsOnNotification(projectList.length);
    }
  }

  setProjectListToStateWithLimitResult(projectList) {
    this.setState({ projectList: projectList.slice(0, LIMIT_PROJECTS_SHOW_ON_MAP) });
  }

  showNumberOfProjectsOnNotification(actualLength) {
    if (this.state.showInitialMessage && actualLength > LIMIT_PROJECTS_SHOW_ON_MAP) {
      this.showDelayedMessage(
        `จำกัดการแสดงผลโครงการคอนโดบนแผนที่สูงสุดไม่เกิน ${LIMIT_PROJECTS_SHOW_ON_MAP} โครงการ (จากทั้งหมด ${actualLength} โครงการ)`,
      );
    } else {
      this.showDelayedMessage(`แสดงรายการโครงการคอนโดทั้งหมด ${actualLength} โครงการ`);
    }
  }

  showDelayedMessage(message) {
    setTimeout(() => {
      // message.info(msg, SHOW_MESSAGE_DURATION);
      clearTimeout();
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
    const filterName = e.target.value.toLowerCase();

    // filtered data from redux store
    const filteredProjects = this.props.projectList.filter(
      project =>
        project.location.lat != null &&
        (project.projectName.toLowerCase().indexOf(filterName) >= 0 ||
          (project.projectNameEn && project.projectNameEn.toLowerCase().indexOf(filterName) >= 0)),
    );
    console.debug('filteredProject=', filteredProjects);

    this.setProjectListToStateWithLimitResult(filteredProjects, LIMIT_PROJECTS_SHOW_ON_MAP);
  };

  onPriceFilterChanged = value => {
    const minAvgPrice = value[0];
    const maxAvgPrice = value[1];

    // reset the searchText on sliding
    this.setState({ isLoading: true, minAvgPrice, maxAvgPrice, searchText: '' });

    const filteredProjects = this.props.projectList
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
    }, 200);
  };

  onProjectMarkerClicked = ({ projectId, projectName, projectNameEn, avgPricePerArea }) => {
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
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div style={{ margin: '5px' }}>
        <div style={{ marginLeft: '15px', marginRight: '15px' }}>
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
                &nbsp;มีทั้งหมด <strong style={{ color: 'darkgreen' }}>{this.state.projectList.length}</strong> โครงการ
              </span>
            )}
            {this.state.isLoading && (
              <span style={{ fontStyle: 'italic' }}>
                <Spin size="small" style={{ marginLeft: '10px', marginRight: '10px' }} />กำลังอัพเดตแผนที่...
              </span>
            )}
          </div>
        </div>
        <GoogleMapWithMarkerClusterer
          markers={this.state.projectList}
          currentLocation={this.state.currentLocation}
          onProjectClicked={this.onProjectMarkerClicked}
        />
      </div>
    );
  }
}

export default connect(state => state.projectList, dispatch => bindActionCreators(actionCreators, dispatch))(
  ProjectList,
);
