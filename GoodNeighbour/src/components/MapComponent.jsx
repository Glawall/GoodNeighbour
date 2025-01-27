import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { GoogleMap, Marker, Circle, InfoWindow } from "@react-google-maps/api";

const MapComponent = ({ points = [] }) => {
  const { user } = useAuth();
  const [map, setMap] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Ensure user coordinates are valid numbers
  const userLat = parseFloat(user?.latitude) || 51.5074;
  const userLng = parseFloat(user?.longitude) || -0.1278;

  const userLocation = {
    lat: userLat,
    lng: userLng,
  };

  // Filter out points with invalid coordinates
  const validPoints = points.filter((point) => {
    const lat = parseFloat(point.latitude);
    const lng = parseFloat(point.longitude);
    return !isNaN(lat) && !isNaN(lng);
  });

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
        borderRadius: "25px",
        overflow: "hidden",
        objectFit: "contain",
      }}
      center={userLocation}
      zoom={13}
      onLoad={(mapInstance) => setMap(mapInstance)}
    >
      {validPoints.map((point) => (
        <Marker
          key={point.id}
          position={{
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude),
          }}
          onClick={() => setSelectedPoint(point)}
        >
          {selectedPoint === point && (
            <InfoWindow onCloseClick={() => setSelectedPoint(null)}>
              <div>
                <strong>
                  {point.first_name} {point.last_name}
                </strong>
                <br />
                <strong>{point.title}</strong>
                <br />
                <strong>Where: {point.postcode}</strong>
                <br />
                <a
                  href={`https://www.google.com/maps?q=${point.latitude},${point.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}

      {user && (
        <>
          <Marker
            position={userLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
          <Circle
            center={userLocation}
            radius={1000}
            options={{
              fillColor: "blue",
              fillOpacity: 0.1,
              strokeColor: "blue",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        </>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
