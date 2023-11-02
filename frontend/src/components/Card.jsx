import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  height: 202px;
  background-color: #999;
`;
const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;
const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

export default function Card() {
  return (
    <Link to={"/video/test"} style={{textDecoration: "none"}}>
      <Container>
        <Image src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <Details>
          <ChannelImage />
          <Texts>
            <Title>Test Title</Title>
            <ChannelName>WojciechTube</ChannelName>
            <Info>660.908 views &middot; 1 day ago </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}
