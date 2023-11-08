import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice"
import axios from "axios"


const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  max-width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const UserDiv = styled.div`
  max-width: 20%;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0px;
  padding-top: 12px;
  padding-right: 10px;
`

const User = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Name = styled.span`
  cursor: pointer;
  &:hover {
    opacity: 70%;
  }
`

const Menu = styled.div`
  width: 100%;
  margin-top: 12px;
  padding: 0 10px;
  background: ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.text};
  border-radius: 5px;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0px;
`

const MenuFunction = styled.span`
  cursor: pointer;
  &:hover {
    opacity: 70%;
  }
`

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [menu, setMenu] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleMenu = () => {
    setMenu((prev) => !prev)
  }

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/signout")
      dispatch(logout())
      navigate("/")
      setMenu(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search..." />
          <SearchIcon />
        </Search>
        {currentUser ? (
          <UserDiv>
            <User>
              <Avatar src={currentUser.img}/>
              <Name onClick={handleMenu}>
                {currentUser.name}
              </Name>
            </User>
            {menu && (
              <Menu>
                <Item>
                  <LogoutIcon style={{width: "25px", height: "25px"}} />
                  <MenuFunction onClick={handleLogout}>
                    Logout
                  </MenuFunction>
                </Item>
                <Item>
                  <VideoCallOutlinedIcon />
                  <MenuFunction>
                    Upload Video
                  </MenuFunction>
                </Item>
              </Menu>)}
          </UserDiv>
        ) : (
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleIcon />
              SIGN IN
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
}
