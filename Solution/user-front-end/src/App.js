import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [users, setUser] = useState();

  useEffect(() => {
    axios.get("/localhost:8000/api/users").then(res => {
      setUser(res);
    });
  });
  return (
    <div className="App">
      <div className="userBox">
        {users.map(user => {
          <div>
            <p>{user.name}</p>
            <p>{user.bio}</p>
          </div>;
        })}
      </div>
    </div>
  );
}

export default App;
