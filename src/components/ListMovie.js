import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../App.css";
import { Link, useLocation } from "react-router-dom";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { fetchData } from "../utils/fetchData";

export default function ListMovie({ title, url, urlType }) {
  const location = useLocation();

  const [data, setData] = useState();
  // const [swiperRef, setSwiperRef] = useState(null);
  useEffect(() => {
    fetchData(url).then(({ results }) => {
      setData(results);
    });
  }, [url]);

  return (
    <>
      <h1 className="title-list-movie">{title}</h1>
      <Swiper
        slidesPerView={1}
        // centeredSlides={false}
        // spaceBetween={20}
        pagination={{
          type: "fraction",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            {" "}
            <Link
              to={`/movie`}
              state={{
                backgroundLocation: location,
                id: item.id,
                type: urlType,
              }}
            >
              <img
                src={`https://media.themoviedb.org/t/p/w300_and_h450_multi_faces${item.poster_path}`}
                alt=""
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
