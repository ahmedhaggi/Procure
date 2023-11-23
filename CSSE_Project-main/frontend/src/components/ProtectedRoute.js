import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { showLoading, hideLoading } from '../redux/alertsSlice';

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to fetch user data from the server
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        'http://localhost:5000/api/user/get-user-info-by-id',
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading()); 
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        navigate('/login'); // Redirect to login page if user data retrieval fails
      }
    } catch (error) {
      dispatch(hideLoading()); 
      localStorage.clear();
      navigate('/login'); // Redirect to login page in case of an error
    }
  };

  useEffect(() => {
    if (!user) {
      getUser(); 
    }
  }, [user]);

  if (localStorage.getItem('token')) {
    return props.children; // Render the protected content if a token exists
  } else {
    return <Navigate to="/login" />; // Redirect to login page if no token exists
  }
}

export default ProtectedRoute;
