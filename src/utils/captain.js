import axios from "axios";

const API_BASE_URL = window.ENV?.API_BASE_URL || "http://localhost:8080";

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// 미식대장 조회 API
export const getCaptains = async () => {
  const res = await http.get("/api/members");
  return res.data; // { status, success, message, data, timeStamp }
};
