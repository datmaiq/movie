import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const SavedFilmsContainer = styled.div`
  padding: 20px;
  background: transparent;
  color: white;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

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
  width: 100%;
  margin-top: 20px;
`;

const FilmCard = styled.div`
  background: #333;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
  width: 150px;
  cursor: pointer;
`;

const FilmImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

function SavedFilms() {
  const [savedFilms, setSavedFilms] = useState([]);
  const location = useLocation();

  const fetchSavedFilms = () => {
    const films = JSON.parse(localStorage.getItem("savedFilms")) || [];
    setSavedFilms(films);
  };

  useEffect(() => {
    fetchSavedFilms();

    const handleStorageUpdate = () => {
      fetchSavedFilms();
    };

    // Listen to the custom event triggered when localStorage is updated
    window.addEventListener("storageUpdate", handleStorageUpdate);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storageUpdate", handleStorageUpdate);
    };
  }, []); // <- Empty dependency array ensures this runs only on mount

  return (
    <SavedFilmsContainer>
      <h1>My Lists</h1>
      <FilmGrid>
        {savedFilms.map((film) => (
          <FilmCard key={film.id}>
            <Link
              to={`/movie/${film.id}`}
              state={{
                backgroundLocation: location,
                id: film.id,
                type: film.type,
              }}
              style={{ textDecoration: "none" }}
            >
              <FilmImage
                src={`https://media.themoviedb.org/t/p/w300_and_h450_multi_faces${film.poster_path}`}
                alt={film.original_title || film.original_name}
              />
            </Link>
          </FilmCard>
        ))}
      </FilmGrid>
    </SavedFilmsContainer>
  );
}

export default SavedFilms;
