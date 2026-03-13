import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // needed for sending cookies (JWT)
});

// Request interceptor to add token if exists in local storage (we are using httpOnly cookies, so we might not need this, but good structure)
export default api;
export { api };
