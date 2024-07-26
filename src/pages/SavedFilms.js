import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SavedFilmsContainer = styled.div`
  padding: 20px;
  background: transparent;
  color: white;
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 5%;
    color: #fff;
  }
`;

const FilmGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
  justify-content: center;
`;

const FilmCard = styled.div`
  background: #333;

  border-radius: 8px;
  overflow: hidden;
  width: 150px; /* Adjust the width as needed */
  cursor: pointer;
`;

const FilmImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

function SavedFilms() {
  const [savedFilms, setSavedFilms] = useState([]);

  useEffect(() => {
    const films = JSON.parse(localStorage.getItem("savedFilms")) || [];
    setSavedFilms(films);
  }, []);

  return (
    <SavedFilmsContainer>
      <h1>My Lists</h1>
      <FilmGrid>
        {savedFilms.map((film) => (
          <FilmCard>
            <FilmImage
              src={`https://media.themoviedb.org/t/p/w300_and_h450_multi_faces${film.poster_path}`}
              alt={film.original_title}
            />
          </FilmCard>
        ))}
      </FilmGrid>
    </SavedFilmsContainer>
  );
}

export default SavedFilms;
