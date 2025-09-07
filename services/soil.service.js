// services/soil.service.js
import { apiClient} from "../lib/apiClient";

export const getSoil = async (lat, lon, token) => {
  return apiClient(`/soil?lat=${lat}&lon=${lon}`, { token });
};
