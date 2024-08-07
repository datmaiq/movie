import React from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const SearchPageContainer = styled.div`
  padding: 20px;
  background: transparent;
  color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 4%;
`;

const FilmGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  justify-content: center;
`;

const FilmCard = styled.div`
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const FilmImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

function SearchPage({ searchValue }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <SearchPageContainer>
      <Header>
        <h1
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Search Results
        </h1>
      </Header>
      <FilmGrid>
        {searchValue
          ?.filter((item) => item.poster_path) // Only include items with a poster_path
          .map((item) => (
            <FilmCard key={item.id}>
              <Link
                to={`/movie`}
                state={{
                  backgroundLocation: location,
                  id: item.id,
                  type: "movie",
                }}
              >
                <FilmImage
                  onClick={() => navigate(`/movie/${item.id}`)}
                  src={`https://media.themoviedb.org/t/p/w300_and_h450_multi_faces${item.poster_path}`}
                  alt={item.title || item.name}
                />
              </Link>
            </FilmCard>
          ))}
      </FilmGrid>
      <Footer />
    </SearchPageContainer>
  );
}

export default SearchPage;
