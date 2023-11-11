import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card.jsx";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default function Home({ type }) {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/videos/${type}`);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos && videos.map((video) => <Card key={video._id} video={video} />)}
    </Container>
  );
}
