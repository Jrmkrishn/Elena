import axios from "axios";

export const IP = import.meta.env.IP || "localhost";
export const PORT = import.meta.env.PORT || 8000;

export const BACKEND_API = axios.create({
  baseURL: `http://${IP}:${PORT}`,
});
