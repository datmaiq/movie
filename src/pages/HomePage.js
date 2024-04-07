import React from "react";

import ListMovie from "../components/ListMovie";
import Footer from "../components/Footer";
import Player from "../components/Player";

function HomePage() {
  return (
    <>
      <Player />

      <div className="list-movie">
        <ListMovie
          title="Top Trending Movie"
          url="/trending/movie/week"
          urlType="movie"
        />
      </div>
      <div className="list-movie">
        <ListMovie
          title="New Releases Movie "
          url="/movie/upcoming"
          urlType="movie"
        />
      </div>
      <div className="list-movie">
        <ListMovie
          title="Top Rated Movie"
          url="/movie/top_rated"
          urlType="movie"
        />
      </div>
      <div className="list-movie">
        <ListMovie
          title="Up Coming TV Series"
          url="/tv/on_the_air"
          urlType="tv"
        />
      </div>
      <div className="list-movie">
        <ListMovie title="Trending TV Series" url="/tv/popular" urlType="tv" />
      </div>
      <div className="list-movie">
        <ListMovie
          title="Top Rated TV Series"
          url="/tv/top_rated"
          urlType="tv"
        />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
