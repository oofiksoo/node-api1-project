import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const getUsers = () => {
      axios.get("http://ctfjmg01:8000/api/users").then(res => {
        setUser(res);
      });
    };
    getUsers();
    console.log(users);
  }, [users]);
  return (
    <div className="App">
      <div className="userBox">
        {users.map(user => (
          <div>
            <p>{user.name}</p>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
