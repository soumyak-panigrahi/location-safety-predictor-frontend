import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";

const LocationMarker = (props) => {
  const { onChange, position } = props;
  const map = useMapEvents({
    click(e) {
      onChange([e.latlng.lat, e.latlng.lng]);
      console.log(e.latlng.lat);
      console.log(e.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const Map = (props) => {
  const { onChange: changeHandler, position } = props;
  return (
    <MapContainer
      center={[41.881832, -87.623177]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      click
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} onChange={changeHandler} />
    </MapContainer>
  );
};

export default Map;
