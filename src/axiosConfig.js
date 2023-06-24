import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API endpoint
  timeout: 5000, // Set a timeout value if desired
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need for your API calls
  },
});

export default instance;
