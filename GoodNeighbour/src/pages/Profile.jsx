import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useUser } from "../hooks/useUser";
import "../styling/Profile.css";

const Profile = () => {
  const { user } = useAuth();
  const { updateUser, getUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        const data = await getUser(user.id);
        setProfileData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [getUser, user?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updateData = {
      email: formData.get("email"),
      avatar_url: formData.get("avatar_url"),
      about: formData.get("about"),
      address: formData.get("address"),
      postcode: formData.get("postcode"),
      phone_number: formData.get("phone_number"),
      additional_contacts: formData.get("additional_contacts"),
      help_radius: formData.get("help_radius"),
    };

    try {
      await updateUser(user.id, updateData);
      setIsEditing(false);
      const updatedData = await getUser(user.id);
      setProfileData(updatedData);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (isLoading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">Error loading profile: {error}</div>;
  if (!profileData)
    return <div className="no-data">No profile data available</div>;

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="card-container profile-container">
          <div className="profile-header">
            <h2>{isEditing ? "Edit Profile" : "My Profile"}</h2>
            <button
              className="btn edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {!isEditing ? (
            <div className="profile-content">
              <div className="content-section">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Username</span>
                    <span className="value">{profileData.username}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email</span>
                    <span className="value">{profileData.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Name</span>
                    <span className="value">
                      {profileData.first_name} {profileData.last_name}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Age</span>
                    <span className="value">{profileData.age}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Address</span>
                    <span className="value">{profileData.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Postcode</span>
                    <span className="value">{profileData.postcode}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Phone</span>
                    <span className="value">{profileData.phone_number}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Help Radius</span>
                    <span className="value">{profileData.help_radius}km</span>
                  </div>
                  <div className="info-item full-width">
                    <span className="label">About</span>
                    <span className="value">{profileData.about}</span>
                  </div>
                  <div className="info-item full-width">
                    <span className="label">Additional Contacts</span>
                    <span className="value">
                      {profileData.additional_contacts}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={profileData.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="avatar_url">Avatar URL</label>
                  <input
                    type="url"
                    id="avatar_url"
                    name="avatar_url"
                    defaultValue={profileData.avatar_url}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="about">About</label>
                  <textarea
                    id="about"
                    name="about"
                    defaultValue={profileData.about}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={profileData.address}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="postcode">Postcode</label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    defaultValue={profileData.postcode}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    defaultValue={profileData.phone_number}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="additional_contacts">
                    Additional Contacts
                  </label>
                  <textarea
                    id="additional_contacts"
                    name="additional_contacts"
                    defaultValue={profileData.additional_contacts}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="help_radius">Help Radius (km)</label>
                  <input
                    type="number"
                    id="help_radius"
                    name="help_radius"
                    defaultValue={profileData.help_radius}
                    min="0"
                    step="1"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn save-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn delete-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
