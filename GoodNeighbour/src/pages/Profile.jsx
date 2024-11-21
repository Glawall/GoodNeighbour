import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useSendRequest } from "../hooks/useSendRequest";
import "../styling/Profile.css";

const Profile = () => {
  const { isLoggedIn, user, logout, login } = useAuth();
  const navigate = useNavigate();
  const { sendRequest, isLoading } = useSendRequest();

  const [profileEdits, setProfileEdits] = useState(
    user
      ? {
          about: { value: user.about || "", editing: false },
          address: { value: user.address || "", editing: false },
          email: { value: user.email || "", editing: false },
          help_radius: { value: user.help_radius || 0, editing: false },
          phone_number: { value: user.phone_number || "", editing: false },
          postcode: { value: user.postcode || "", editing: false },
          additional_contacts: {
            value: user.additional_contacts || "",
            editing: false,
          },
        }
      : {}
  );

  const handleEditClick = (field) => {
    setProfileEdits((profile) => ({
      ...profile,
      [field]: { ...profile[field], editing: true },
    }));
  };

  const handleCancelClick = (field) => {
    setProfileEdits((profile) => ({
      ...profile,
      [field]: { ...profile[field], editing: false },
    }));
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setProfileEdits((profile) => ({
      ...profile,
      [field]: { ...profile[field], value },
    }));
  };

  const handleSaveClick = async (field) => {
    const updatedData = { [field]: profileEdits[field].value };
    try {
      await sendRequest(`users/${user.id}`, "PATCH", updatedData, "", {
        "X-User-ID": user.id,
      });
      setProfileEdits((profile) => ({
        ...profile,
        [field]: { ...profile[field], editing: false },
      }));
      const updatedUser = {
        ...user,
        [field]: profileEdits[field].value,
      };
      console.log(updatedUser);
      login(updatedUser);
    } catch (err) {
      console.error(`Error updating ${field}:`, err);
    }
  };

  const editableField = (fieldName, label) => (
    <div className="profile-edits">
      <label className="profile-label">{label}: </label>
      {profileEdits[fieldName].editing ? (
        <>
          <input
            type="text"
            value={profileEdits[fieldName].value}
            onChange={(e) => handleChange(e, fieldName)}
          />
          {profileEdits[fieldName].isLoading ? (
            <span>Saving...</span>
          ) : (
            <>
              <button onClick={() => handleSaveClick(fieldName)}>Save</button>
              <button
                className="cancel"
                onClick={() => handleCancelClick(fieldName)}
              >
                Cancel
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <span>{profileEdits[fieldName].value}</span>
          <button onClick={() => handleEditClick(fieldName)}>Edit</button>
        </>
      )}
    </div>
  );

  return user ? (
    <div className="user-container">
      <h2>Welcome {user.username}!</h2>
      <img src={user.avatar_url} className="user-avatar" alt="user avatar" />
      {editableField("about", "About")}
      {editableField("address", "Address")}
      {editableField("email", "Email")}
      {editableField("help_radius", "Help Radius (km)")}
      {editableField("phone_number", "Phone Number")}
      {editableField("postcode", "Postcode")}
      {editableField("additional_contacts", "Additional Contact Information")}
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  ) : (
    <section>
      <h2>Please log in to continue!</h2>
      <div>
        <button onClick={() => navigate("/")}>Sign In</button>
      </div>
    </section>
  );
};

export default Profile;
