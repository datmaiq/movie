import React from "react";
import { useParams } from "react-router-dom";
import DetailCard from "../components/DetailCard";
function DetailPage() {
  const params = useParams();
  const movieId = params.id;
  return (
    <div>
      <h1>DetailPage {params.id}</h1>
      <h1>hello {params.id}</h1>
    </div>
  );
}

export default DetailPage;
