import axios from "axios";
import { useEffect } from "react";

function HomeRoute(props) {
  // Define function to fetch user data
  const fetchData = async () => {
    try {
      // Make an HTTP POST request to get user information
      const response = await axios.post(
        'http://localhost:5000/api/user/get-user-info-by-id',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      console.log(response.data); 
    } catch (error) {
      console.error("Error fetching user data:", error); // Log any errors
    }
  }

  // Use the useEffect hook to fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchData(); // Call the fetchData function
    } else {
      console.error("Token not found. Please log in.");
    }
  }, []); 
}

export default HomeRoute;
