import { Grid } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function SearchPage({ searchValue }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="wrap-search">
      <Grid container spacing={1} sx={{ mt: 6 }}>
        {searchValue?.map((item, index) => (
          <Grid item xs={12} md={4} lg={3} xl={3} key={item.id} sx={{ mb: 3 }}>
            <Link
              to={`/movie`}
              state={{
                backgroundLocation: location,
                id: item.id,
                type: "movie",
              }}
            >
              <img
                onClick={() => navigate(`/movie/${item.id}`)}
                src={`https://media.themoviedb.org/t/p/w300_and_h450_multi_faces${item.poster_path}`}
                alt=""
              />
            </Link>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </div>
  );
}

export default SearchPage;
