import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MiniMapComponent = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return <div className="no-location">Location not available</div>;
  }

  const location = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
      }}
      center={location}
      zoom={15}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      <Marker position={location} />
    </GoogleMap>
  );
};

export default MiniMapComponent;
