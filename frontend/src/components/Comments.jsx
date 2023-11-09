import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.textarea`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  background-color: #424ef5;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    opacity: 70%;
  }
`;

export default function Comments({ videoId }) {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newData, setNewData] = useState({});
  const [deleteComment, setDeleteComment] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${videoId}`);
        setComments(res.data);
        setDeleteComment(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [videoId, newData, deleteComment]);

  const handleComment = async () => {
    try {
      const res = await axios.post("/api/comments", {
        videoId: videoId,
        desc: newComment,
      });
      setNewData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          placeholder="Add a comment..."
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleComment}>COMMENT</Button>
      </NewComment>
      {comments &&
        []
          .concat(comments)
          .reverse()
          .map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              currentUser={currentUser}
              setDeleteComment={setDeleteComment}
            />
          ))}
    </Container>
  );
}
