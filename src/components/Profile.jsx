import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userdata, setuserdata] = useState([]);
  const [loader, setloader] = useState(false);
  const [currentUser, setCurrentUser] = useState(); 

  useEffect(() => {
    const getProfileData = async () => {
      setloader(true);

      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const response = await axios.get('http://localhost:5002/users');
        setloader(false);

        const users = response.data;
        console.log("Fetched users:", users);

        const user = users.find((u) => u.token === token); 
        if (user) {
          setCurrentUser(user);
        } else {
          alert("User not found. Please log in again.");
        }
      } catch (err) {
        setloader(false);
        console.log("Error occurred:", err);
        alert("You are not logged in");
      }
    };

    getProfileData();
  }, []);

  return (
    <>
      <h1>Profile Data</h1>
      {loader ? (
        <div>Loading...</div>
      ) : currentUser ? (
        <div>
          <div>ID: {currentUser.id}</div>
          <div>Email: {currentUser.email}</div>
          <div>Password: {currentUser.password}</div>
          <div>Token: {currentUser.token}</div>
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </>
  );
};

export default Profile;
