import React from "react";
import "../App.css";
export default function Carousel({ data }) {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-config='{"interval":3000}'
    >
      <div className="carousel-inner">
        {data.map((item, index) => (
          <div className={`carousel-item${index ? "" : "active"}`}>
            <div className="img-cover">
              <img
                key={item.id}
                src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.poster_path}`}
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="info-film">
              <h1>{item.title}</h1>
              <p>{item.overview}</p>
              <button type="button" className="btn btn-danger me-3">
                Watch
              </button>
              <button type="button" className="btn btn-secondary">
                Info
              </button>
            </div>
          </div>
        ))}

        {/* <div className="carousel-item">
          <img
            src="https://image.tmdb.org/t/p/w500//4m8yq8vEVGVcmOxO39j1Yz8ry1s.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div> */}
        {/* <div className="carousel-item">
          <img
            src="https://image.tmdb.org/t/p/w500//4m8yq8vEVGVcmOxO39j1Yz8ry1s.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div> */}
      </div>
    </div>
  );
}

// export default Carousel;
