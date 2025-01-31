import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHelpRequest } from "../hooks/useHelpRequest";
import { useHelpTypes } from "../hooks/useHelpTypes";
import FormInput from "../common/FormInput";
import LoadingSpinner from "../common/LoadingSpinner";
import "../styling/CreateHelpRequest.css";

const CreateHelpRequest = () => {
  const navigate = useNavigate();
  const { createHelpRequest } = useHelpRequest();
  const { getAllHelpTypes } = useHelpTypes();
  const [helpTypes, setHelpTypes] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    help_type: "",
    req_date: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHelpTypes = async () => {
      try {
        const types = await getAllHelpTypes();
        setHelpTypes(types);
        setForm((prev) => ({
          ...prev,
          help_type: types[0]?.name || "",
        }));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchHelpTypes();
  }, [getAllHelpTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await createHelpRequest(form);
      navigate(`/help-requests/${response.newHelpRequest.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-request-page">
      <div className="form-header">
        <h2>Create Help Request</h2>
      </div>
      {error && <div className="error-message">{error}</div>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit} className="create-form">
          <FormInput
            label="Title*"
            type="text"
            id="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Description*"
            type="textarea"
            id="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="form-group">
            <label htmlFor="help_type">Help Type</label>
            <select
              id="help_type"
              name="help_type"
              value={form.help_type}
              onChange={handleChange}
              required
            >
              {helpTypes.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="req_date">Date Needed</label>
            <input
              type="date"
              id="req_date"
              name="req_date"
              value={form.req_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-container">
            <button type="submit" className="btn create-button">
              Create Request
            </button>
            <button
              type="button"
              className="btn btn-delete"
              onClick={() => navigate("/my-help-requests")}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateHelpRequest;
