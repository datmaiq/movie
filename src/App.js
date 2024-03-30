import React, { useEffect, useState } from "react";
import "./App.css";
// import Media from "./components/Meida";
// import Carousel from "./components/Carousel";
// import ListMovie from "./components/ListMovie";
import DetailCard from "./components/DetailCard";
import Header from "./components/Header";
import { fetchData } from "./utils/fetchData";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

function App() {
  let navigate = useNavigate();
  const [topRated, setTopRated] = useState([]);
  const [listPopular, setListPopular] = useState([]);
  const [listTheatres, setListTheatres] = useState([]);
  // const [detailMovie, setDetailMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState([]);

  // useEffect(() => {
  //   if (searchTerm) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
  //           {
  //             headers: {
  //               Authorization:
  //                 "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2I0OWVhMDMyZjQ3ZTgyNWUxOTAxZjgyZGY1OWQxOCIsInN1YiI6IjY2MDI2NjhmNjA2MjBhMDE3YzJlYzlhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3TM4MrLhXJLfzMK3X7x-g0JlyXxyHbK8Qhd0ZPcbSGM",
  //             },
  //           }
  //         );
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchData();
  //   } else {
  //     setSearchValue([]);
  //   }
  // }, []);

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

  useEffect(() => {
    if (searchTerm) {
      fetchData(`/search/movie?query=${searchTerm}`).then((data) => {
        console.log(data);
        setSearchValue(data.results);
      });
    }
    console.log(searchValue);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
    if (searchTerm) {
      navigate("/search");
    }
    if (searchTerm === "") {
      navigate("/");
    }
  };

  return (
    <div className="wrapped">
      <Header searchTerm={searchTerm} handleSearch={handleSearch} />
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
        <Route
          path="/search"
          element={<SearchPage searchValue={searchValue} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
