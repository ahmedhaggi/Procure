import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Admin = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Function to fetch user data
  const getData = async () => {
    try {
      // Send a POST request to get user information by ID
      const response = await axios.post(
        'http://localhost:5000/api/user/get-user-info-by-id',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      // Log the user data received from the server
      console.log('User Data:', response.data);
    } catch (error) {
      // Handle errors and log them
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Call the function to fetch user data when the component mounts
    getData();
  }, []);

  return (
    <Layout>
      <h1 style={{ textAlign: 'center' }}></h1>
    </Layout>
  );
};

export default Admin;
