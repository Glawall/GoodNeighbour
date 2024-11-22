import { useAuth } from "../context/AuthProvider";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import HelpRequestCard from "../components/HelpRequestCard";
import MapComponent from "../components/MapComponent";
import { useSendRequest } from "../hooks/useSendRequest";
import { checkDistance } from "../utils/checkDistance";
import { fetchAndSetHelpTypes } from "../utils/fetchAndSetHelpTypes";
import "../styling/HelpRequests.css";

const HelpRequests = () => {
  const { user } = useAuth();
  const [helpRequests, setHelpRequests] = useState([]);
  const [helpTypes, setHelpTypes] = useState([]);
  const [sortByOptions, setSortByOptions] = useState({
    sort_by: "created_at",
    order: "desc",
    help_type: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, error, sendRequest } = useSendRequest();

  const fetchHelpTypes = useCallback(() => {
    fetchAndSetHelpTypes(sendRequest, setHelpTypes);
  }, [sendRequest, setHelpTypes]);

  const fetchHelpRequests = useCallback(async () => {
    if (!user) return;
    const queryParams = new URLSearchParams(sortByOptions).toString();
    try {
      const { helpRequests } = await sendRequest(
        `help-requests`,
        "GET",
        null,
        `?${queryParams}`
      );
      const filteredRequests = helpRequests.filter((helpRequest) => {
        const distance = checkDistance(
          user.latitude,
          user.longitude,
          helpRequest.author_latitude,
          helpRequest.author_longitude
        );
        return distance <= 5;
      });
      setHelpRequests(filteredRequests);
    } catch (err) {
      console.error("Error fetching helpRequests:", err);
    }
  }, [sortByOptions, user, sendRequest]);

  useEffect(() => {
    fetchHelpTypes();
    fetchHelpRequests();
  }, []);

  useEffect(() => {
    setSearchParams(sortByOptions);
  }, [sortByOptions, setSearchParams]);

  const handleOrderChange = (event) => {
    setSortByOptions((existing) => ({
      ...existing,
      order: event.target.value,
    }));
  };

  const handleSortByChange = (event) => {
    setSortByOptions((existing) => ({
      ...existing,
      sort_by: event.target.value,
    }));
  };

  const handleHelpTypeClick = (helpType) => {
    setSortByOptions((existing) => ({
      ...existing,
      help_type: helpType,
    }));
  };

  const points = helpRequests.map((request) => ({
    first_name: request.author_first_name || "Helpee",
    last_name: request.author_last_name,
    latitude: request.author_latitude,
    longitude: request.author_longitude,
    id: request.id,
    title: request.title,
    postcode: request.author_postcode,
    type: request.help_type,
  }));

  if (loading) return <p>Loading help-requests...</p>;

  return (
    <div className="help-requests-container">
      <div className="sorting-options">
        <div className="select-container">
          <select value={sortByOptions.order} onChange={handleOrderChange}>
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
          <select value={sortByOptions.sort_by} onChange={handleSortByChange}>
            <option value="created_at">Date</option>
            <option value="help_type">Title</option>
            <option value="author_username">Author</option>
          </select>
        </div>
        <div className="help-type-links">
          <span
            className={`help-type-link ${
              !sortByOptions.help_type ? "active" : ""
            }`}
            onClick={() => handleHelpTypeClick("")}
          >
            All
          </span>
          {helpTypes.map((helpType) => (
            <span
              key={helpType.id}
              className={`help-type-link ${
                sortByOptions.help_type === helpType.name ? "active" : ""
              }`}
              onClick={() => handleHelpTypeClick(helpType.name)}
            >
              {helpType.name}
            </span>
          ))}
        </div>
      </div>

      <div className="help-requests-list">
        {helpRequests.length > 0 &&
        helpRequests.author_username !== user.username ? (
          helpRequests.map((helpRequest) => (
            <HelpRequestCard key={helpRequest.id} helpRequest={helpRequest} />
          ))
        ) : (
          <p>No help requests available.</p>
        )}
      </div>

      <div className="map-container">
        <MapComponent points={points} />
      </div>
    </div>
  );
};

export default HelpRequests;
