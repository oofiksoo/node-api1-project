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
      <div className="userBox">{console.log(users)}</div>
    </div>
  );
}

export default App;
