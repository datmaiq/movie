import React, { useEffect, useState } from "react";
import "./App.css";
// import Media from "./components/Meida";
// import Carousel from "./components/Carousel";
// import ListMovie from "./components/ListMovie";
import Header from "./components/Header";
import { fetchData } from "./utils/fetchData";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { Routes, Route } from "react-router-dom";
import DetailCard from "./components/DetailCard";
function App() {
  const [topRated, setTopRated] = useState([]);
  const [listPopular, setListPopular] = useState([]);
  const [listTheatres, setListTheatres] = useState([]);
  const [detailMovie, setDetailMovie] = useState([]);

  useEffect(() => {
    fetchData("/movie/top_rated").then((data) => {
      setTopRated(data.results);
    });
    fetchData("/trending/movie/week").then((data) => {
      setListPopular(data.results);
    });
    fetchData("/movie/upcoming").then((data) => {
      setListTheatres(data.results);
    });
  }, []);

  console.log(topRated);
  return (
    <div className="wrapped">
      <Header />
      {/* <Media /> */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              topRated={topRated}
              listPopular={listPopular}
              listTheatres={listTheatres}
            />
          }
        ></Route>
        <Route path="/movie/:id" element={<DetailPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
