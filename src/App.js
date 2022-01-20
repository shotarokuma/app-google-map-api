import React, { useRef } from "react";
import { GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import Geocode from "react-geocode";

const Map = () => {

  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  const center = {
    lat: 35.6895014,
    lng: 139.6917337
  };

  const inputEl = useRef();
  let address = "";
  Geocode.setApiKey();
  Geocode.setLanguage("ja");

  const handleClick = () => {
    address = inputEl.current.value;
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        center.lat = lat;
        center.lng = lng;
      },
      (error) => {
        alert("エラー")
      }
    );
  }
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={handleClick}>検索</button>
      <LoadScript
        googleMapsApiKey=""
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          <Marker
            position={{
              lat: center.lat,
              lng: center.lng
            }}
          />
        </GoogleMap>
      </LoadScript>
    </>
  )
}

export default Map