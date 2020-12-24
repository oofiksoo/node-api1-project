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
  //const addUser (name, bio) => {

  //}
  const deleteUser = id => {
    axios.delete(`http://ctfjmg01:8000/api/users/${id}`).then(res => {
      axios.get("http://ctfjmg01:8000/api/users").then(res => {
        setUser(res.data);
      });
    });
  };
  return (
    <div className="App">
      <h1>Users:</h1>
      <div className="userBox">
        {users.map(user => (
          <div
            className="userCard"
            key={user.id}
            onClick={() => {
              deleteUser(user.id);
            }}
          >
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
      <div className="addUser">
        <field type="text" className="userName"></field>
        <field type="text" className="userBio"></field>
        <button
          onClick={() => {
            // addUser();
          }}
        ></button>
      </div>
    </div>
  );
}

export default App;
