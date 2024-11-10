import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HelpRequestCard from "../components/HelpRequestCard";
import MapComponent from "../components/MapComponent";
import { useSendRequest } from "../hooks/useSendRequest";
import { checkDistance } from "../utils/checkDistance";

const HelpRequests = () => {
  const { isLoggedIn, user } = useAuth();
  const [helpRequests, setHelpRequests] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortByOptions, setSortByOptions] = useState({
    sort_by: "created_at",
    order: "desc",
    help_type: "",
  });
  const [helpTypes, setHelpTypes] = useState([]);
  const { loading, error, sendRequest } = useSendRequest();

  const fetchHelpTypes = async () => {
    try {
      const { helpTypes } = await sendRequest(`help-types`, "GET");
      setHelpTypes(helpTypes);
    } catch (err) {
      console.error("Error fetching helpTypes:", err);
    }
  };

  const fetchHelpRequests = async () => {
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
      console.log("Filtered Help Requests:", filteredRequests);
      setHelpRequests(filteredRequests);
    } catch (err) {
      console.error("Error fetching helpRequests:", err);
    }
  };

  useEffect(() => {
    console.log("User from Auth Context in HelpRequests:", user);
    console.log("Is Logged In:", isLoggedIn);

    if (!isLoggedIn) {
      navigate("/help-requests");
    } else {
      fetchHelpRequests();
      fetchHelpTypes();
    }
  }, [isLoggedIn, sortByOptions, user]); // Trigger when isLoggedIn, sortByOptions, or user changes

  useEffect(() => {
    setSearchParams(sortByOptions);
  }, [sortByOptions, setSearchParams]); // Sync search params with sortByOptions

  const handleOrderChange = (event) => {
    setSortByOptions((existing) => {
      return { ...existing, order: event.target.value };
    });
  };

  const handleSortByChange = (event) => {
    setSortByOptions((existing) => {
      return { ...existing, sort_by: event.target.value };
    });
  };

  const handleHelpTypeClick = (helpType) => {
    setSortByOptions((existing) => ({
      ...existing,
      help_type: helpType,
    }));
  };

  const points = helpRequests.map((request) => ({
    name: request.author_username || "Helpee",
    latitude: request.author_latitude,
    longitude: request.author_longitude,
  }));

  if (loading) return <p>Loading help-requests...</p>;

  return (
    <div className="help-requests-container">
      <div className="sorting-options">
        <select value={sortByOptions.order} onChange={handleOrderChange}>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
        <select value={sortByOptions.sort_by} onChange={handleSortByChange}>
          <option value="created_at">Date</option>
          <option value="help_type">Title</option>
          <option value="author_username">Author</option>
        </select>
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
      <ul>
        {helpRequests.length > 0 ? (
          helpRequests.map((helpRequest) => (
            <HelpRequestCard key={helpRequest.id} helpRequest={helpRequest} />
          ))
        ) : (
          <p>No help requests available.</p>
        )}
      </ul>
      <MapComponent points={points} />
    </div>
  );
};

export default HelpRequests;
