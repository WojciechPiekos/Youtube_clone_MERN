import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;
const Text = styled.span`
  font-size: 14px;
`;

const DeleteButton = styled.div`
  position: absolute;
  right: 50px;
  color: ${({ theme }) => theme.text};
`;

export default function Comment({ comment, currentUser, setDeleteComment }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRes = await axios.get(`/api/users/find/${comment.userId}`);
        setUser(userRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [comment.userId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/comments/${comment._id}`)
      setDeleteComment(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Avatar src={user.img} />
      <Details>
        <Name>
          {user.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
      {currentUser._id === user._id && (
        <DeleteButton onClick={handleDelete}>
          <DeleteOutlineIcon style={{ width: "32px", height: "32px" }} />
        </DeleteButton>
      )}
    </Container>
  );
}
