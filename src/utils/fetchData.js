import axios from "axios";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchData = async (path) => {
  try {
    const response = await axios.get(`${BASE_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};
