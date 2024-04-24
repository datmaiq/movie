import axios from "axios";

export const fetchData = async (path) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3${path}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2I0OWVhMDMyZjQ3ZTgyNWUxOTAxZjgyZGY1OWQxOCIsInN1YiI6IjY2MDI2NjhmNjA2MjBhMDE3YzJlYzlhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3TM4MrLhXJLfzMK3X7x-g0JlyXxyHbK8Qhd0ZPcbSGM",
      },
    });

    // console.log(response.data.results);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
