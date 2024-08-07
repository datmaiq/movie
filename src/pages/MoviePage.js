import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData } from "../utils/fetchData";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const SavedFilmsContainer = styled.div`
  padding: 20px;
  background: transparent;
  color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 4%;
`;

const FilmGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  justify-content: center;
`;

const FilmCard = styled.div`
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const FilmImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const movieCategories = [
  {
    title: "Top Trending Movie",
    url: "/trending/movie/week",
    urlType: "movie",
  },
  {
    title: "New Releases Movie",
    url: "/movie/upcoming",
    urlType: "movie",
  },
  {
    title: "Top Rated Movie",
    url: "/movie/top_rated",
    urlType: "movie",
  },
];

function MoviePage() {
  const [savedFilms, setSavedFilms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("Genre");
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGenreClick = async (genreId, genreName) => {
    const data = await fetchData(`/discover/movie?with_genres=${genreId}`);
    if (data && data.results) {
      setSavedFilms(data.results);
    }
    setSelectedGenre(genreName);
    handleClose();
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await fetchData("/genre/movie/list");
      if (data && data.genres) {
        setGenres(data.genres);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchAllMovies = async () => {
      const allMovies = [];
      for (const category of movieCategories) {
        const data = await fetchData(category.url);
        if (data && data.results) {
          allMovies.push(...data.results);
        }
      }

      const moviesOnly = allMovies.filter((movie) => movie.media_type !== "tv");
      setSavedFilms(moviesOnly);
    };

    fetchAllMovies();
  }, []);

  return (
    <SavedFilmsContainer>
      <Header>
        <h1
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Movie
        </h1>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{
            color: "#fff",
            marginLeft: "20px",
            padding: "5px",
            backgroundColor: "transparent",
            boxShadow: "inset 0 0 0 1px #fff",
          }}
        >
          {selectedGenre}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {genres.map((genre) => (
            <MenuItem
              key={genre.id}
              onClick={() => handleGenreClick(genre.id, genre.name)}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Menu>
      </Header>
      <FilmGrid>
        {savedFilms.map((film, index) => (
          <FilmCard key={index}>
            <Link
              to={`/movie/${film.id}`}
              state={{
                backgroundLocation: location,
                id: film.id,
                type: "movie",
              }}
              style={{ textDecoration: "none" }}
            >
              <FilmImage
                src={`https://media.themoviedb.org/t/p/w300_and_h450_multi_faces${film.poster_path}`}
                alt={film.original_title}
              />
            </Link>
          </FilmCard>
        ))}
      </FilmGrid>
    </SavedFilmsContainer>
  );
}

export default MoviePage;
