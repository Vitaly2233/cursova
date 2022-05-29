import axios from "axios";
import { CONFIG } from "./Config";
import securedStorage from "./SecuredStorage";

const token = securedStorage.get("access_token");

const headers = token
  ? {
      Authorization: `Bearer ${token}`,
    }
  : {};

export const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  validateStatus: (status) => status >= 200 && status < 500,
  headers,
});
