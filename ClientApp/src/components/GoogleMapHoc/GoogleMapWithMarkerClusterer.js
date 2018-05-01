import React from 'react';
import { compose, withProps, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { GOOGLE_MAP_API_KEY, GOOGLE_MAP_DEFAULT_ZOOM, GOOGLE_CLUSTERER_GRID_SIZE } from '../../config';

const GoogleMapWithMarkerClusterer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&v=3.exp`,
    loadingElement: <div style={{ height: `100%` }} />, // required props for withScriptjs Hoc
    containerElement: <div style={{ height: `85vh` }} />, // required props for withgooglemap Hoc
    mapElement: <div style={{ height: `100%` }} />, // required props for withgooglemap Hoc
  }),
  withHandlers(() => {
    return {
      onMarkerClustererClick: () => markerClusterer => {
        const clickedMarkers = markerClusterer.getMarkers();
        console.debug(`Current clicked markers total project: ${clickedMarkers.length}`);
      },
    };
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap defaultZoom={GOOGLE_MAP_DEFAULT_ZOOM} defaultCenter={props.currentLocation} center={props.currentLocation}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={GOOGLE_CLUSTERER_GRID_SIZE}
    >
      {props.markers.map(project => (
        <Marker
          icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          markerWithLabel={false}
          label={project.projectName}
          key={project.projectId}
          position={{ lat: project.location.lat, lng: project.location.lng }}
          onClick={() => props.onProjectClicked(project)}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

export default GoogleMapWithMarkerClusterer;
