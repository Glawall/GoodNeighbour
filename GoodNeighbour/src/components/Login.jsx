import { useAuth } from "../context/AuthProvider";
import { useSendRequest } from "../hooks/useSendRequest";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateNewUser from "./CreateNewUser";

const Login = () => {
  const { isLoggedIn, user, login, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [currentSelectedUser, setCurrentSelectedUser] = useState("");
  const navigate = useNavigate();
  const [postcodes, setPostcodes] = useState([]);

  const { isLoading, error, sendRequest } = useSendRequest("users", "GET");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { users } = await sendRequest("users", "GET");
        setUsers(users);
        setPostcodes(users.map((user) => user.postcode));
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = users.find(
      (user) => user.username === currentSelectedUser
    );
    if (currentUser) {
      login(currentUser);
      navigate("/helpRequests");
    } else {
      console.log("User not found");
    }
  };

  const handleChange = (event) => {
    setCurrentSelectedUser(event.target.value);
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error}</p>;

  return (
    <div>
      <h1>Login</h1>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {user?.username || "User"}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Select a User to Log In</h2>
          <form className="user-select-form" onSubmit={handleSubmit}>
            <label htmlFor="user-select">
              <select
                onChange={handleChange}
                value={currentSelectedUser}
                id="user-select"
              >
                <option value="">Please choose a user</option>
                {users.map(({ username }) => (
                  <option key={username} value={username}>
                    {username}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <div className="login-buttons">
              <button type="submit" disabled={!currentSelectedUser}>
                Sign in
              </button>
            </div>
          </form>
          <CreateNewUser postcodes={postcodes} setUsers={setUsers} />
        </div>
      )}
    </div>
  );
};

export default Login;
