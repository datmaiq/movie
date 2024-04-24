import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import { Box, Modal } from "@mui/material";

function DetailPage({ searchTerm }) {
  const style = {
    width: "50",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    border: "none",
  };
  let navigate = useNavigate();
  let { state } = useLocation();

  const [movie, setMovie] = useState();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    if (searchTerm) {
      navigate("/search");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${state.type}/${state.id}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2I0OWVhMDMyZjQ3ZTgyNWUxOTAxZjgyZGY1OWQxOCIsInN1YiI6IjY2MDI2NjhmNjA2MjBhMDE3YzJlYzlhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3TM4MrLhXJLfzMK3X7x-g0JlyXxyHbK8Qhd0ZPcbSGM",
            },
          }
        );

        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [state]);

  return movie ? (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="detail-card">
          <div className="card text-bg-dark">
            <img
              src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path}`}
              className="card-img"
              alt="..."
            />
            <div className="card-img-overlay">
              <h1>{movie.original_title}</h1>
              <h5>Vote Average: {movie.vote_average}</h5>
              <p className="card-text">Release Date : {movie.release_date}</p>
              <p className="card-text">
                <small>{movie.overview}</small>
              </p>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  ) : (
    <div />
  );
}

export default DetailPage;
