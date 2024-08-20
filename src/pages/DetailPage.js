import React, { useEffect, useState, useRef } from "react";
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
  background: #181818;
  border-radius: 50%;
  color: white;
  height: 36px;
  width: 36px;
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

const SaveButton = styled.button`
  background: ${({ isSaved }) => (isSaved ? "transparent" : "transparent")};
  color: ${({ isSaved }) => (isSaved ? "white" : "white")};
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
    background: ${({ isSaved }) => (isSaved ? "#fff" : "#fff")};
    color: ${({ isSaved }) => (isSaved ? "#333" : "#333")};
    border-color: ${({ isSaved }) => (isSaved ? "#fff" : "#333")};
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

const PosterImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

function DetailPage() {
  let navigate = useNavigate();
  let { state } = useLocation();
  const [media, setMedia] = useState();
  const [videoKey, setVideoKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const modalRef = useRef(null);

  const handleClose = () => {
    navigate(state?.backgroundLocation?.pathname || "/");
  };

  const handlePlay = () => {
    if (videoKey) {
      navigate(`/video/${videoKey}`);
    }
  };

  const handleSave = () => {
    const savedFilms = JSON.parse(localStorage.getItem("savedFilms")) || [];
    const existingIndex = savedFilms.findIndex((film) => film.id === media.id);

    if (existingIndex === -1) {
      const filmToSave = { ...media, type: state.type };
      localStorage.setItem(
        "savedFilms",
        JSON.stringify([...savedFilms, filmToSave])
      );
      setIsSaved(true);
    } else {
      savedFilms.splice(existingIndex, 1);
      localStorage.setItem("savedFilms", JSON.stringify(savedFilms));
      setIsSaved(false);
    }


    window.dispatchEvent(new Event("storageUpdate"));
  };

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mediaType = state.type === "movie" ? "movie" : "tv";
        const mediaResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/${mediaType}/${state.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );

        setMedia(mediaResponse.data);

        const videoResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/${mediaType}/${state.id}/videos`,
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

        const savedFilms = JSON.parse(localStorage.getItem("savedFilms")) || [];
        const isFilmSaved = savedFilms.some(
          (film) => film.id === mediaResponse.data.id
        );
        setIsSaved(isFilmSaved);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [state]);

  return media ? (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer ref={modalRef}>
        <Header>
          <CloseButton onClick={() => handleClose()}>&times;</CloseButton>
          <PlayButton onClick={handlePlay}>Play</PlayButton>
          <SaveButton onClick={handleSave} isSaved={isSaved}>
            {isSaved ? "−" : "+"}
          </SaveButton>
          <PosterImage
            src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${media.poster_path}`}
            alt="Media Poster"
          />
        </Header>
        <Content>
          <Title>
            {state.type === "movie" ? media.original_title : media.name}
          </Title>
          <Description>{media.overview}</Description>
          <Info>
            <InfoItem>
              <strong>Genres:</strong>{" "}
              {media.genres.map((genre) => genre.name).join(", ")}
            </InfoItem>
            <InfoItem>
              <strong>
                {state.type === "movie" ? "Release date:" : "First air date:"}
              </strong>{" "}
              {media.release_date || media.first_air_date}
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
