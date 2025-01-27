import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HelpRequestCard from "../components/HelpRequestCard";
import { useHelpRequests } from "../hooks/useHelpRequests";
import { useAuth } from "../context/AuthProvider";
import MapComponent from "../components/MapComponent";
import { checkDistance } from "../utils/checkDistance";
import "../styling/HelpRequests.css";
import { useHelpTypes } from "../hooks/useHelpTypes";

const HelpRequests = () => {
  const { getAllHelpRequests } = useHelpRequests();
  const { getAllHelpTypes } = useHelpTypes();
  const [requests, setRequests] = useState([]);
  const [points, setPoints] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    sort_by: "created_at",
    order: "desc",
    help_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [helpTypes, setHelpTypes] = useState([]);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const allRequests = await getAllHelpRequests(sortOptions);
      const openRequests = allRequests.filter(
        (request) => request.status === "active"
      );
      if (user?.latitude && user?.longitude) {
        const requestsWithDistance = await Promise.all(
          openRequests.map(async (request) => {
            const userLat = parseFloat(user.latitude) || 0;
            const userLng = parseFloat(user.longitude) || 0;
            const reqLat = parseFloat(request.author_latitude) || 0;
            const reqLng = parseFloat(request.author_longitude) || 0;

            const distance = checkDistance(userLat, userLng, reqLat, reqLng);
            return { ...request, distance };
          })
        );
        const sortedRequests = requestsWithDistance.sort(
          (a, b) => a.distance - b.distance
        );
        const points = sortedRequests.map((request) => {
          const lat = parseFloat(request.author_latitude);
          const lng = parseFloat(request.author_longitude);

          return {
            first_name: request.author_first_name || "Helpee",
            last_name: request.author_last_name,
            latitude: lat,
            longitude: lng,
            id: request.id,
            title: request.title,
            postcode: request.author_postcode,
            type: request.help_type,
          };
        });
        setRequests(sortedRequests);
        setPoints(points);
      } else {
        setRequests(openRequests);
      }

      setError(null);
    } catch (err) {
      setError("Failed to load help requests");
    } finally {
      setLoading(false);
    }
  }, [sortOptions, getAllHelpRequests, user]);

  const fetchHelpTypes = useCallback(async () => {
    try {
      const types = await getAllHelpTypes();
      setHelpTypes(types);
    } catch (err) {
      setError("Failed to load help types");
    }
  }, [getAllHelpTypes]);

  useEffect(() => {
    fetchRequests();
    fetchHelpTypes();
  }, [fetchRequests, fetchHelpTypes]);

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    navigate(`/help-requests/${request.id}`);
  };

  const handleFilterClick = (helpType) => {
    setSortOptions((current) => ({
      ...current,
      help_type: current.help_type === helpType ? "" : helpType,
    }));
  };

  const handleSortChange = (order) => {
    setSortOptions((current) => ({
      ...current,
      order,
    }));
  };

  const handleSortByChange = (sortBy) => {
    setSortOptions((current) => ({
      ...current,
      sort_by: sortBy,
    }));
  };

  const filterByDistance = useCallback((userLat, userLon) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) => ({
        ...request,
        distance: checkDistance(
          userLat,
          userLon,
          request.latitude,
          request.longitude
        ),
      }))
    );
  }, []);

  if (loading) return <div>Loading help requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="help-requests-page">
      <div className="help-requests-container">
        <div className="help-requests-header">
          <div className="help-type-links">
            <button
              className={`help-type-link ${
                !sortOptions.help_type ? "active" : ""
              }`}
              onClick={() => handleFilterClick("")}
            >
              All Types
            </button>
            {helpTypes.map((type) => (
              <button
                key={type.id}
                className={`help-type-link ${
                  sortOptions.help_type === type.name ? "active" : ""
                }`}
                onClick={() => handleFilterClick(type.name)}
              >
                {type.name}
              </button>
            ))}
          </div>

          <div className="sorting-options">
            <select
              value={sortOptions.sort_by}
              onChange={(e) => handleSortByChange(e.target.value)}
            >
              <option value="created_at">Date</option>
              <option value="help_type">Type</option>
              <option value="author_username">Author</option>
            </select>
            <select
              value={sortOptions.order}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="content-container">
          <div className="help-requests-list">
            {requests.map((request) => (
              <HelpRequestCard
                key={request.id}
                helpRequest={request}
                onSelect={handleSelectRequest}
                selected={selectedRequest?.id === request.id}
              />
            ))}
          </div>

          <div className="map-container">
            <MapComponent
              points={points}
              selectedRequest={selectedRequest}
              userLocation={{ lat: user?.latitude, lng: user?.longitude }}
              onDistanceFilter={filterByDistance}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpRequests;
