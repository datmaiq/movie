import React, { useEffect, useState, useDeferredValue } from "react";
import "./App.css";

// import ListMovie from "./components/ListMovie";
// import DetailCard from "./components/DetailCard";
import Header from "./components/Header";
import { fetchData } from "./utils/fetchData";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

function App() {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState([]);
  const deferredTerm = useDeferredValue(searchTerm);
  const location = useLocation();
  let state = location.state;
  useEffect(() => {
    if (deferredTerm) {
      fetchData(`/search/movie?query=${deferredTerm}`).then((data) => {
        // console.log(data);
        setSearchValue(data.results);
        navigate("/search");
      });
    } else {
      navigate("/");
    }
  }, [deferredTerm]);

  const handleSearch = (event) => {
    // event.preventDefault();
    console.log("searchValue", event.target.value);
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    console.log("hi");
  };

  return (
    // <div className="wrapped">
    <>
      <Header
        searchTerm={searchTerm}
        clearSearch={clearSearch}
        handleSearch={handleSearch}
      />

      <Routes
        location={
          location.state?.backgroundLocation
            ? location.state.backgroundLocation
            : location
        }
      >
        <Route path="/" element={<HomePage />}></Route>
        {/* <Route path="/movie/:id" element={<DetailPage />}></Route> */}
        <Route
          path="/search"
          element={<SearchPage searchValue={searchValue} />}
        ></Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/movie"
            element={<DetailPage searchTerm={searchTerm} />}
          ></Route>
        </Routes>
      )}
      {/* </div> */}
    </>
  );
}

export default App;
