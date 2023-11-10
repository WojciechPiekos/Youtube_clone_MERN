import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios"
import { useNavigate } from "react-router-dom"

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
  &:hover {
    opacity: 70%;
  }
`;

const Label = styled.label`
  font-size: 14px;
`;

function Upload({ setOpen, setMenu }) {
  setMenu(false);

  const navigate = useNavigate()

  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      console.log({...inputs,tags})
      const res = await axios.post("/api/videos",{...inputs,tags})
      setOpen(false)
      navigate(`/video/${res.data._id}`)
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading: " + videoPerc + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
        )}
        <Input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas"
          onChange={handleTags}
          required
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading: " + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            required
          />
        )}
        <Button onClick={handleUpload}>UPLOAD</Button>
      </Wrapper>
    </Container>
  );
}

export default Upload;
