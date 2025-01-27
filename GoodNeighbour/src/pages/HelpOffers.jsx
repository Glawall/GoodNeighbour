import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";

const HelpOffers = () => {
  const { isLoggedIn, user, login, logout } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (loading) return <p>Loading users...</p>;
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
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <button onClick={() => login(user)}>{user.username}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HelpOffers;
