import { useAuth } from "../context/AuthProvider";
import { useSendRequest } from "../hooks/useSendRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNewUser = ({ postcodes, setUsers }) => {
  const { isLoading, error, sendRequest } = useSendRequest("users", "POST");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar_url: "",
    age: "",
    first_name: "",
    last_name: "",
    about: "",
    address: "",
    postcode: "",
    phone_number: "",
    additional_contacts: "",
    help_radius: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendRequest("users", "POST", formData);
      const user = response.newUser;
      setUsers((prev) => [...prev, user]);
      login(user);
      navigate("/helpRequests");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <div className="create-user-container">
      <form className="create-user-form" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="avatar_url">Avatar URL</label>
          <input
            type="text"
            id="avatar_url"
            name="avatar_url"
            value={formData.avatar_url}
            onChange={handleChange}
          />

          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min={16}
            max={120}
            required
          />
          <label htmlFor="help_radius">Help radius:</label>
          <input
            type="number"
            id="help_radius"
            name="help_radius"
            value={formData.help_radius}
            onChange={handleChange}
            min={16}
            max={120}
            required
          />
          <label htmlFor="about">About</label>
          <input
            type="text"
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="postcode">Postcode</label>
          <select
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
          >
            <option value="">Please choose a postcode</option>
            {postcodes.map((item, index) => (
              <option key={`${item}-${index}`} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <label htmlFor="additional-contacts">
            Additional Contact Details:
          </label>
          <input
            type="text"
            id="additional_contacts"
            name="additional_contacts"
            value={formData.additional_contacts}
            onChange={handleChange}
            required
          />
        </fieldset>
        <button type="submit" disabled={isLoading || !formData.postcode}>
          {isLoading ? "Creating..." : "Create User and Sign In!"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewUser;
