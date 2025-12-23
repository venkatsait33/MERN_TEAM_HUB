import axios from "axios";

axios.defaults.withCredentials = true; // this is for cookies

export const HR_API_END_POINT =
  import.meta.env.VITE_BACKEND_URL + "/api/v1/auth";
export const EMPLOYEE_API_END_POINT =
  import.meta.env.VITE_BACKEND_URL + "/api/v1/";
export const LEAVE_API_END_POINT =
  import.meta.env.VITE_BACKEND_URL + "/api/v1/leave";
