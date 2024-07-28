import React from "react";
import ListMovie from "./ListMovie";

const ListMoviesSection = ({ movies }) => {
  return (
    <>
      {movies.map((movie, index) => (
        <div className="list-movie" key={index}>
          <ListMovie
            title={movie.title}
            url={movie.url}
            urlType={movie.urlType}
          />
        </div>
      ))}
    </>
  );
};

export default ListMoviesSection;
