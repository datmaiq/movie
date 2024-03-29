import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../App.css";
import { useNavigate } from "react-router-dom";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function App({ title, data }) {
  const navigate = useNavigate();
  // const [swiperRef, setSwiperRef] = useState(null);

  return (
    <>
      <h1 className="title-list-movie">{title}</h1>
      <Swiper
        // onSwiper={setSwiperRef}
        slidesPerView={4}
        // centeredSlides={false}
        // spaceBetween={20}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={item.id}>
            {" "}
            <img
              onClick={() => navigate(`/movie/${item.id}`)}
              src={`https://media.themoviedb.org/t/p/w300_and_h450_multi_faces${item.poster_path}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
