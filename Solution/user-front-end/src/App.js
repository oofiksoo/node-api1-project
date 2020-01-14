import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const getUsers = () => {
      axios.get("http://ctfjmg01:8000/api/users").then(res => {
        setUser(res.data);
      });
    };
    getUsers();
  }, []);
  return (
    <div className="App">
      <div className="userBox">
        <h1>Users:</h1>
        {users.map(user => (
          <div className="userCard" key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
