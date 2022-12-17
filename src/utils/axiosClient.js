import axios from "axios";

const generateClient = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:1337/api",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const accessToken = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : null;
  if (accessToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  return instance;
}
export default generateClient;

