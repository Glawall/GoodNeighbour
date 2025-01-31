import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import ConfirmBox from "../common/ConfirmBox";
import FormInput from "../common/FormInput";
import LoadingSpinner from "../common/LoadingSpinner";
import "../styling/Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const { updateUser, getUser, deleteUser } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    changes: null,
  });
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    postcode: "",
    email: "",
    additional_contacts: "",
    about: "",
    avatar_url: "",
    phone: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        const data = await getUser(user.id);
        setProfileData(data);
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          postcode: data.postcode || "",
          email: data.email || "",
          additional_contacts: data.additional_contacts || "",
          about: data.about || "",
          avatar_url: data.avatar_url || "",
          phone: data.phone || "",
        });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [getUser, user?.id]);

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
      await updateUser(user.id, form);
      setProfileData(form);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleConfirmSave = async () => {
    try {
      await updateUser(user.id, confirmDialog.changes);
      navigate("/help-requests");
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setConfirmDialog({ isOpen: false, changes: null });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.id);
      logout();
      navigate("/login", {
        state: { message: "Your account has been successfully deleted." },
      });
    } catch (err) {
      setError("Failed to delete account: " + err.message);
    } finally {
      setDeleteConfirmDialog(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error">Error loading profile: {error}</div>;
  if (!profileData)
    return <div className="no-data">No profile data available</div>;

  return (
    <div className="page-container">
      <div className="card-container profile-container">
        <div className="profile-header">
          <h2>{isEditing ? "Edit Profile" : "My Profile"}</h2>
          <div className="profile-actions">
            <button
              className={`btn ${isEditing ? "delete-button" : "edit-button"}`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button
              className="btn delete-button"
              onClick={() => setDeleteConfirmDialog(true)}
            >
              Delete Account
            </button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-section">
              <FormInput
                label="Email"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              <FormInput
                label="Avatar URL"
                type="url"
                id="avatar_url"
                name="avatar_url"
                value={form.avatar_url}
                onChange={handleChange}
              />

              <FormInput
                label="About"
                type="textarea"
                id="about"
                name="about"
                value={form.about}
                onChange={handleChange}
              />

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={form.address || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="postcode">Postcode</label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={form.postcode}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="additional_contacts">Additional Contacts</label>
                <textarea
                  id="additional_contacts"
                  name="additional_contacts"
                  value={form.additional_contacts}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="help_radius">Help Radius (km)</label>
                <input
                  type="number"
                  id="help_radius"
                  name="help_radius"
                  value={form.help_radius || ""}
                  onChange={handleChange}
                  min="0"
                  step="1"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn">
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
        ) : (
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
        )}
      </div>
      <ConfirmBox
        isOpen={confirmDialog.isOpen}
        message="Are you sure you want to save these changes to your profile?"
        onConfirm={handleConfirmSave}
        onCancel={() => setConfirmDialog({ isOpen: false, changes: null })}
      />
      <ConfirmBox
        isOpen={deleteConfirmDialog}
        message="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={handleDeleteAccount}
        onCancel={() => setDeleteConfirmDialog(false)}
        type="delete"
        confirmText="Delete Account"
      />
    </div>
  );
};

export default Profile;
