import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: #181818;
  width: 90%;
  max-width: 800px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  padding: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px;
  color: white;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Description = styled.p`
  margin: 10px 0;
`;

const Info = styled.div`
  margin-top: 20px;
`;

const InfoItem = styled.p`
  margin: 5px 0;
`;

const PlayButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 10px 40px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  position: absolute;
  bottom: 20px;
  left: 3%;

  &:hover {
    background: #ff3333;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 8px 30px;
    font-size: 14px;
    left: 5%;
  }

  @media (max-width: 480px) {
    padding: 6px 20px;
    font-size: 12px;
    left: 10%;
  }
`;

const PlusButton = styled.button`
  background: transparent;
  color: white;
  margin-left: 30px;
  font-weight: bold;
  border: 1.5px solid white;
  padding: 5px 15px;
  cursor: pointer;
  border-radius: 55%;
  font-size: 20px;
  position: absolute;
  bottom: 20px;
  left: 15%;

  &:hover {
    background: #fff;
    color: #333;
    border-color: #333;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 18px;
    left: 20%;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 16px;
    left: 25%;
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

function DetailPage({ searchTerm, isOpen }) {
  let navigate = useNavigate();
  let { state } = useLocation();

  const [movie, setMovie] = useState();
  const [videoKey, setVideoKey] = useState("");

  const handleClose = () => {
    if (searchTerm) {
      navigate("/search");
    } else {
      navigate("/");
    }
  };

  const handlePlay = () => {
    if (videoKey) {
      navigate(`/video/${videoKey}`);
    }
  };

  const handleSave = () => {
    const savedFilms = JSON.parse(localStorage.getItem("savedFilms")) || [];
    const existingIndex = savedFilms.findIndex((film) => film.id === movie.id);
    if (existingIndex === -1) {
      localStorage.setItem(
        "savedFilms",
        JSON.stringify([...savedFilms, movie])
      );
    }
    navigate(`/save`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/${state.type}/${state.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );

        setMovie(movieResponse.data);

        const videoResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/${state.type}/${state.id}/videos`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );

        const videos = videoResponse.data.results;
        if (videos.length > 0) {
          setVideoKey(videos[0].key);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [state]);

  return movie ? (
    <Overlay>
      <ModalContainer>
        <Header>
          <CloseButton onClick={() => handleClose()}>&times;</CloseButton>
          <PlayButton onClick={handlePlay}>Play</PlayButton>
          <PlusButton onClick={handleSave}>+</PlusButton>
          <PosterImage
            src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path}`}
            alt="Movie Poster"
          />
        </Header>
        <Content>
          <Title>{movie.original_title}</Title>
          <Description>{movie.overview}</Description>
          <Info>
            <InfoItem>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </InfoItem>
            <InfoItem>
              <strong>Release date:</strong> {movie?.release_date}
            </InfoItem>
          </Info>
        </Content>
      </ModalContainer>
    </Overlay>
  ) : (
    <div></div>
  );
}

export default DetailPage;
