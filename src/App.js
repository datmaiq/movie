import React, {
  useEffect,
  useState,
  useDeferredValue,
  useCallback,
} from "react";
import "./App.css";

import Header from "./components/Header";
import { fetchData } from "./utils/fetchData";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import VideoPlayer from "./components/VideoPlayer";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import SavedFilms from "./pages/SavedFilms";
import MoviePage from "./pages/MoviePage";
import TvPage from "./pages/TvPage";
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
        setSearchValue(data.results);
        navigate("/search");
      });
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [deferredTerm]);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    navigate("/");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clearSearch={clearSearch}
        handleSearch={handleSearch}
      />

      <Routes location={location.state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/genre1" element={<MoviePage />}></Route>
        <Route path="/genre2" element={<TvPage />}></Route>
        <Route path="/save" element={<SavedFilms />}></Route>
        <Route path="/video/:videoKey" element={<VideoPlayer />} />
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
