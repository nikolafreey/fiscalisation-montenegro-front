import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const MapContainer = (props) => {
  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: -1.2884,
        lng: 36.8233,
      }}
    />
  );
};
export default GoogleApiWrapper({
  apiKey: 'AIzaSyC-ZLNK-iG9ve4BAA8AjlYJAXahk1nnf0k',
})(MapContainer);
