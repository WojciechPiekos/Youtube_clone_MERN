import React from 'react'
import styled from 'styled-components'
import Comment from './Comment'


const Container = styled.div`
    
`

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const Input = styled.input`
  border  : none;
  border-bottom: 1px solid ${({theme}) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({theme}) => theme.text};
`

export default function Comments() {
  return (
    <Container>
        <NewComment>
            <Avatar src='https://samequizy.pl/wp-content/uploads/2021/07/19/images_bb8855c27de3.jpg'/>
            <Input placeholder='Add a comment...'/>
        </NewComment>
        <Comment />
        <Comment />
        <Comment />
    </Container>
  )
}
