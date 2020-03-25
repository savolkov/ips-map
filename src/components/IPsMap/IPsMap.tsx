import React from 'react';
import {
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
  constructor(props: any) {
    super(props);
    this.state = { markers: [] };
  }

  controlPanelResultsHandler = (results: any) => {
    if (!results) return;
    this.setState({ markers: results });
  };

  render(): React.ReactElement<any, any> {
    const { markers } = this.state;
    const center = { lat: 30, lng: 0 }
    return (
      <div className="IPsMap">
        <ControlPanel
          cbFromParent={this.controlPanelResultsHandler}
        />
        <Map center={center} zoom={1}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {markers.map((m: any, idx: string) => (
            // eslint-disable-next-line react/no-array-index-key
            <Marker key={`marker-${idx}`} position={m.coords}>
              <Popup>
                <span>{m.text}</span>
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>

    );
  }
}

export default IPsMap;
