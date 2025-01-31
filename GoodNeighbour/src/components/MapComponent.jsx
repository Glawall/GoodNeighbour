import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { GoogleMap, Marker, Circle, InfoWindow } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/DateFormatting";
import "../styling/MapComponent.css";

const MapComponent = ({ points = [], selectedRequest, userLocation }) => {
  const { user } = useAuth();
  const [map, setMap] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const navigate = useNavigate();

  const mapCenter =
    userLocation ||
    (selectedRequest && {
      lat: parseFloat(selectedRequest.latitude),
      lng: parseFloat(selectedRequest.longitude),
    }) ||
    defaultCenter;

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
      center={mapCenter}
      zoom={14}
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
              <div className="info-window-content">
                <div className="info-window-header">
                  <h3>{point.type}</h3>
                </div>
                <div className="info-window-body">
                  <strong>
                    {point.first_name} {point.last_name}
                  </strong>
                  <br />
                  <p>{formatDate(point.req_date)}</p>
                  <p>
                    <a
                      href={`https://www.google.com/maps?q=${point.latitude},${point.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link"
                    >
                      View on Google Maps
                    </a>
                  </p>
                  <div className="info-window-actions">
                    <button
                      onClick={() => navigate(`/help-requests/${point.id}`)}
                      className="respond-button"
                    >
                      View & Respond
                    </button>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}

      {userLocation && (
        <>
          <Marker
            position={userLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            }}
          />
          <Circle
            center={userLocation}
            radius={1000}
            options={{
              fillColor: "green",
              fillOpacity: 0.1,
              strokeColor: "green",
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
