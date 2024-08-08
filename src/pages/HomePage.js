import React from "react";
import Trailer from "../components/Trailer";
import ListMoviesSection from "../components/ListMoviesSection";
import Footer from "../components/Footer";
import MoviePage from "./MoviePage";
import TvPage from "./TvPage";
import SavedFilms from "./SavedFilms";

function HomePage({ activeSection }) {
  const movies = [
    {
      title: "Top Trending Movie",
      url: "/trending/movie/week",
      urlType: "movie",
    },
    { title: "New Releases Movie", url: "/movie/upcoming", urlType: "movie" },
    { title: "Top Rated Movie", url: "/movie/top_rated", urlType: "movie" },
    { title: "Up Coming TV Series", url: "/tv/on_the_air", urlType: "tv" },
    { title: "Trending TV Series", url: "/tv/popular", urlType: "tv" },
    { title: "Top Rated TV Series", url: "/tv/top_rated", urlType: "tv" },
  ];

  return (
    <>
      {activeSection === "home" && (
        <>
          <Trailer />
          <ListMoviesSection movies={movies} />
        </>
      )}
      {activeSection === "movies" && <MoviePage />}
      {activeSection === "tv" && <TvPage />}
      {activeSection === "myList" && <SavedFilms />}
      <Footer />
    </>
  );
}

export default HomePage;
