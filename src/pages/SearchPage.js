import React from "react";
import { useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

function SearchPage({ searchValue }) {
  const navigate = useNavigate();
  return (
    <div>
      {searchValue?.map((item, index) => (
        <SwiperSlide key={item.id}>
          {" "}
          <img
            onClick={() => navigate(`/movie/${item.id}`)}
            src={`https://media.themoviedb.org/t/p/w300_and_h450_multi_faces${item.poster_path}`}
            alt=""
          />
        </SwiperSlide>
      ))}
    </div>
  );
}

export default SearchPage;
