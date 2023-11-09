import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Close = styled.div`
  position: absolute;
  background-color: red;
  color: white;
  padding: 5px;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.div`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
`;

function Upload({ setOpen, setMenu }) {
  setMenu(false);
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        <Input type="file" accept="video/*" />
        <Input type="text" placeholder="Title" />
        <Desc placeholder="Description" rows={8} />
        <Input type="text" placeholder="Separate the tags with commas" />
        <Label>Image:</Label>
        <Input type="file" accept="image/*" />
        <Button>UPLOAD</Button>
      </Wrapper>
    </Container>
  );
}

export default Upload;
