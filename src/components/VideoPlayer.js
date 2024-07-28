import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000;
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
`;

function VideoPlayer() {
  const { videoKey } = useParams();

  return (
    <VideoContainer>
      <Video
        src={`https://www.youtube.com/embed/${videoKey}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video Player"
      />
    </VideoContainer>
  );
}

export default VideoPlayer;
