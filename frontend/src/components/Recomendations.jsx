import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import styled from "styled-components";

const Container = styled.div`
  flex: 2;
`;

function Recomendations({ tags }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/videos/tags?tags=${tags}`);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [tags]);

  return (
  <Container>
    {videos && videos.map((video) => (
        <Card key={video._id} video={video} type={"sm"}/>
    ))}
  </Container>
  )
}

export default Recomendations;
