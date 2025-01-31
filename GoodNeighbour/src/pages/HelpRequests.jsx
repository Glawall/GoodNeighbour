import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HelpRequestCard from "../components/HelpRequestCard";
import { useHelpRequests } from "../hooks/useHelpRequests";
import { useAuth } from "../context/AuthProvider";
import MapComponent from "../components/MapComponent";
import { checkDistance } from "../utils/checkDistance";
import "../styling/HelpRequests.css";
import { useHelpTypes } from "../hooks/useHelpTypes";
import LoadingSpinner from "../common/LoadingSpinner";

const HelpRequests = () => {
  const { getAllHelpRequests } = useHelpRequests();
  const { getAllHelpTypes } = useHelpTypes();
  const [requests, setRequests] = useState([]);
  const [points, setPoints] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    sort_by: "req_date",
    order: "desc",
    help_type: "",
  });
  const [{ loading, error }, setStatus] = useState({
    loading: false,
    error: null,
  });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [helpTypes, setHelpTypes] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState(null);

  const fetchRequests = useCallback(async () => {
    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const data = await getAllHelpRequests(sortOptions);
      const openRequests = data.filter(
        (request) =>
          request.author_id !== user.id && request.status === "active"
      );

      if (user?.latitude && user?.longitude) {
        const requestsWithDistance = await Promise.all(
          openRequests.map(async (request) => {
            const [userLat, userLng] = [
              parseFloat(user.latitude),
              parseFloat(user.longitude),
            ];
            const [reqLat, reqLng] = [
              parseFloat(request.author_latitude),
              parseFloat(request.author_longitude),
            ];

            const distance = checkDistance(userLat, userLng, reqLat, reqLng);
            return { ...request, distance };
          })
        );

        let filteredByDistance = requestsWithDistance;
        if (distanceFilter) {
          filteredByDistance = requestsWithDistance.filter(
            (request) => request.distance <= distanceFilter
          );
        }

        const points = filteredByDistance.map((request) => ({
          ...request,
          first_name: request.author_first_name || "Helpee",
          latitude: parseFloat(request.author_latitude),
          longitude: parseFloat(request.author_longitude),
        }));

        setRequests(filteredByDistance);
        setPoints(points);
      } else {
        setRequests(openRequests);
      }

      setStatus((prev) => ({ ...prev, error: null }));
    } catch (err) {
      setStatus((prev) => ({ ...prev, error: "Failed to load help requests" }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, [sortOptions, getAllHelpRequests, user, distanceFilter]);

  const fetchHelpTypes = useCallback(async () => {
    try {
      const types = await getAllHelpTypes();
      setHelpTypes(types);
    } catch (err) {
      setStatus((prev) => ({ ...prev, error: "Failed to load help types" }));
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

    if (current.sort_by === "distance") {
      const sortedRequests = [...requests].sort((a, b) =>
        order === "asc" ? a.distance - b.distance : b.distance - a.distance
      );
      setRequests(sortedRequests);
    }
  };

  const handleSortByChange = (sortBy) => {
    setSortOptions((current) => ({
      ...current,
      sort_by: sortBy,
    }));

    if (sortBy === "distance") {
      const sortedRequests = [...requests].sort((a, b) =>
        current.order === "asc"
          ? a.distance - b.distance
          : b.distance - a.distance
      );
      setRequests(sortedRequests);
    }
  };

  const handleDistanceFilterChange = (miles) => {
    setDistanceFilter(miles);
    setSortOptions((prev) => ({ ...prev, sort_by: "", order: "desc" }));
  };

  const handleReset = () => {
    setDistanceFilter(null);
    setSortOptions({
      sort_by: "req_date",
      order: "desc",
      help_type: "",
    });
  };

  if (loading) return <LoadingSpinner size="large" />;
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
              <option value="req_date">Date</option>
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

            <div className="distance-controls">
              <select
                value={distanceFilter || ""}
                onChange={(e) =>
                  handleDistanceFilterChange(Number(e.target.value))
                }
              >
                <option value="">All Distances</option>
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
                <option value="15">Within 15 miles</option>
              </select>

              <button className="btn" onClick={handleReset}>
                Reset Filters
              </button>
            </div>
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
                distance={request.distance}
              />
            ))}
          </div>

          <div className="map-container">
            <MapComponent
              points={points}
              selectedRequest={selectedRequest}
              userLocation={{ lat: user?.latitude, lng: user?.longitude }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpRequests;
