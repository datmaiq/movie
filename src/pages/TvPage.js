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

const tvSeriesCategories = [
  {
    title: "Up Coming TV Series",
    url: "/tv/on_the_air",
    urlType: "tv",
  },
  {
    title: "Trending TV Series",
    url: "/tv/popular",
    urlType: "tv",
  },
  {
    title: "Top Rated TV Series",
    url: "/tv/top_rated",
    urlType: "tv",
  },
];

function TVPage() {
  const [savedTv, setSavedTv] = useState([]);
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
    const data = await fetchData(`/discover/tv?with_genres=${genreId}`);
    if (data && data.results) {
      setSavedTv(data.results);
    }
    setSelectedGenre(genreName);
    handleClose();
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await fetchData("/genre/tv/list");
      if (data && data.genres) {
        setGenres(data.genres);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchAllTVSeries = async () => {
      const allTVSeries = [];
      for (const category of tvSeriesCategories) {
        const data = await fetchData(category.url);
        console.log(data);
        if (data && data.results) {
          allTVSeries.push(...data.results);
        }
      }

      const tvSeriesOnly = allTVSeries.filter(
        (series) => series.media_type !== "movie"
      );
      setSavedTv(tvSeriesOnly);
    };

    fetchAllTVSeries();
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
          TV Series
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
        {savedTv.map((film, index) => (
          <FilmCard key={index}>
            <Link
              to={`/movie/${film.id}`}
              state={{
                backgroundLocation: location,
                id: film.id,
                type: "tv",
              }}
              style={{ textDecoration: "none" }}
            >
              <FilmImage
                src={`https://media.themoviedb.org/t/p/w300_and_h450_multi_faces${film.poster_path}`}
                alt={film.original_name}
              />
            </Link>
          </FilmCard>
        ))}
      </FilmGrid>
    </SavedFilmsContainer>
  );
}

export default TVPage;
