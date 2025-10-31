import axios from "axios";

const client = axios.create(
  {
    baseURL: import.meta.env.VITE_BASE_URL+`${"/dashboard-api/v1"}`,
    // baseURL: "http://localhost:3000/dashboard-api/v1",
    withCredentials: false,
  },
  
);

export default client;

export const reCapchaMatching = async (value) => {
  try {
    const response = await client.post("/verify-recapcha", value);
    return response.data;
  } catch (error) {
    return error;
  }
};
