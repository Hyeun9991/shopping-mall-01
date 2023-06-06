import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const Landing = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        navigate('/login');
      } else {
        alert('로그아웃에 실패 했습니다.');
      }
    });
  };

  return (
    <Layout>
      <Container>
        <h1>Landing</h1>
        <button onClick={onClickHandler}>Logout</button>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Landing;
