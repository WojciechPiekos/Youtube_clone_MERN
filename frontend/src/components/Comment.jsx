import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({theme}) => theme.text}
`;
const Name = styled.span`
  font-size  : 13px;
  font-weight: 500;

`
const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.textSoft};
    margin-left: 5px;
`
const Text = styled.span`
  font-size: 14px;  
`

export default function Comment() {
  return (
  <Container>
    <Avatar src="https://samequizy.pl/wp-content/uploads/2021/07/19/images_bb8855c27de3.jpg" />
    <Details>
        <Name>Wojciech Piękoś <Date>1 day ago</Date></Name>
        <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum expedita reiciendis iusto veritatis repellendus a repellat ab nesciunt quia quod labore, libero ullam voluptas quam, distinctio debitis totam deleniti est?
        </Text>
    </Details>
  </Container>
  )
}
