import React from "react";
import video from "../Video/trailer.mp4";
function Player() {
  return (
    <div>
      <video className="video-trailer" src={video} autoPlay muted></video>
    </div>
  );
}

export default Player;
