const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:5123" : API_BASE;

