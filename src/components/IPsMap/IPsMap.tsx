import React from 'react';
import {
  FeatureGroup,
  Map,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import './IPsMap.css';
import ControlPanel from '../ControlPanel/ControlPanel';

type IPsMapState = {
  markers: any;
}

// eslint-disable-next-line react/prefer-stateless-function
class IPsMap extends React.Component<{}, IPsMapState> {
  mapRef: any;

  groupRef: any;

  constructor(props: any) {
    super(props);
    this.state = { markers: [] };
    this.mapRef = React.createRef();
    this.groupRef = React.createRef();
  }

  controlPanelResultsHandler = (results: any) => {
    this.setState({ markers: results }, () => {
      if (results.length === 0) return;
      const map = this.mapRef.current.leafletElement; // get native Map instance
      const group = this.groupRef.current.leafletElement; // get native featureGroup instance
      map.fitBounds(group.getBounds());
    });
  };

  render(): React.ReactElement<any, any> {
    const { markers } = this.state;
    const center = { lat: 30, lng: 0 }
    return (
      <div className="IPsMap">
        <ControlPanel
          cbFromParent={this.controlPanelResultsHandler}
        />
        <Map center={center} zoom={1} ref={this.mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <FeatureGroup ref={this.groupRef}>
            {markers.map((m: any, idx: string) => (
              // eslint-disable-next-line react/no-array-index-key
              <Marker key={`marker-${idx}`} position={m.coords}>
                <Popup>
                  <span>{m.text}</span>
                </Popup>
              </Marker>
            ))}
          </FeatureGroup>
        </Map>
      </div>

    );
  }
}

export default IPsMap;
