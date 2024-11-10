import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";

const MapComponent = ({ points }) => {
  const { user } = useAuth();
  const [map, setMap] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const userPoints = {
    name: "Helper",
    latitude: user ? user.latitude : 0,
    longitude: user ? user.longitude : 0,
  };

  const defaultCenter = { lat: 51.5074, lng: -0.1278 };

  const center =
    points.length > 0
      ? { lat: userPoints.latitude, lng: userPoints.longitude }
      : defaultCenter;

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={center}
        zoom={13}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {points.map((point, index) => (
          <Marker
            key={index}
            position={{ lat: point.latitude, lng: point.longitude }}
            onClick={() => setSelectedPoint(point)}
          >
            {selectedPoint &&
              selectedPoint.latitude === point.latitude &&
              selectedPoint.longitude === point.longitude && (
                <InfoWindow onCloseClick={() => setSelectedPoint(null)}>
                  <div>
                    <strong>{point.name}</strong>
                    <br />
                    {point.description}
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
          <Marker
            position={{ lat: userPoints.latitude, lng: userPoints.longitude }}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
            onClick={() => setSelectedPoint(userPoints)}
          >
            {selectedPoint &&
              selectedPoint.latitude === userPoints.latitude &&
              selectedPoint.longitude === userPoints.longitude && (
                <InfoWindow onCloseClick={() => setSelectedPoint(null)}>
                  <div>
                    <strong>{userPoints.name}</strong>
                    <br />
                    {userPoints.description}
                    <br />
                    <a
                      href={`https://www.google.com/maps?q=${userPoints.latitude},${userPoints.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </InfoWindow>
              )}
          </Marker>
        )}

        {user && (
          <Circle
            center={{ lat: userPoints.latitude, lng: userPoints.longitude }}
            radius={1000}
            options={{
              fillColor: "green",
              fillOpacity: 0.1,
              strokeColor: "green",
              strokeOpacity: 0.6,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
