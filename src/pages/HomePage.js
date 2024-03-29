import React from "react";
import Carousel from "../components/Carousel";
import ListMovie from "../components/ListMovie";
function HomePage({ topRated, listPopular, listTheatres }) {
  return (
    <div>
      <Carousel data={topRated} />
      <div className="list-movie">
        <ListMovie title={"Top Trending"} data={listPopular} />
      </div>
      <div className="list-movie">
        <ListMovie title={"Top Rated "} data={topRated} />
      </div>
      <div className="list-movie">
        <ListMovie title={"New Releases"} data={listTheatres} />
      </div>
    </div>
  );
}

export default HomePage;
