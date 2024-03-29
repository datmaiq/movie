import React from "react";

function DetailCard({ data }) {
  console.log(data);
  return (
    <div className="card text-bg-dark">
      {data?.map((item) => (
        <>
          <img
            src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.poster_path}`}
            className="card-img"
            alt="..."
          />
          <div className="card-img-overlay">
            <h5 className="card-title">{data.id}</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small>Last updated 3 mins ago</small>
            </p>
          </div>
        </>
      ))}
    </div>
  );
}

export default DetailCard;
