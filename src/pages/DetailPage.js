import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

function DetailPage() {
  const { id } = useParams();
  const [movieId, setMovieId] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2I0OWVhMDMyZjQ3ZTgyNWUxOTAxZjgyZGY1OWQxOCIsInN1YiI6IjY2MDI2NjhmNjA2MjBhMDE3YzJlYzlhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3TM4MrLhXJLfzMK3X7x-g0JlyXxyHbK8Qhd0ZPcbSGM",
            },
          }
        );
        console.log(id);
        console.log(response.data);
        setMovieId(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(movieId);
  }, []);

  return (
    <div>
      <div className="card text-bg-dark">
        <img
          src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieId.poster_path}`}
          className="card-img"
          alt="..."
        />
        <div className="card-img-overlay">
          <h1>{movieId.original_title}</h1>
          <h5>Vote Average: {movieId.vote_average}</h5>
          <p className="card-text">Release Date : {movieId.release_date}</p>
          <p className="card-text">
            <small>{movieId.overview}</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
