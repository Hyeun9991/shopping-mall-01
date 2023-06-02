import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/user_actions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let body = {
      email: data.email,
      password: data.password,
    };

    // login
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate('/');
      } else {
        alert('로그인에 실패했습니다.');
      }
    });
  };

  return (
    <Container>
      <LoginFormContainer>
        <Title>Sign in</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrap>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && (
              <ErrorText>This email field is required</ErrorText>
            )}
          </InputWrap>

          <InputWrap>
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === 'required' && (
              <ErrorText>This field is required</ErrorText>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <ErrorText>Password must have at least 6 characters</ErrorText>
            )}
          </InputWrap>

          <SubmitButton>Sign in</SubmitButton>
        </Form>
        <SignUpWrap>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </SignUpWrap>
      </LoginFormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at right bottom, #6606ad60, #fff 30%);
`;
const LoginFormContainer = styled.div`
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  height: auto;
  padding: 32px;
  border-radius: 0.75rem;
  margin: 1rem;
  box-shadow: 0 40px 40px rgb(205 205 205);
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 3rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  label {
    display: none;
  }

  input {
    background: #ededed;
    outline: none;
    border: none;
    transition: 0.3s all ease-in-out;
    font-size: 14px;
    font-weight: 400;
    color: #000;
    border-radius: 0.75rem;
    border: 0.1rem solid transparent;
    padding: 0.75rem 1rem;

    &:focus {
      border-color: #6606ad;
    }

    &::placeholder {
      color: #8b8b8b;
    }
  }
`;
const ErrorText = styled.p`
  color: #ff0060;
  margin: 0;
  margin-left: 0.3rem;
  font-size: 12px;
  font-weight: 400;
`;
const SubmitButton = styled.button`
  background-color: #6606ad;
  margin-top: 1rem;
  text-transform: uppercase;
  border-radius: 999px;
  font-weight: 500;
  font-size: 12px;
  padding-bottom: 16px;
  padding-top: 16px;
  transition: 0.22s ease-out;
  width: 100%;
  border: none;
  color: #efefef;
  box-shadow: 0 81.5873px 65.2699px rgba(102, 6, 173, 0.14),
    0 34.0852px 27.2682px rgba(102, 6, 173, 0.1),
    0 18.2236px 14.5789px rgb(102 6 173/8%),
    0 10.216px 8.1728px rgb(102 6 173/7%),
    0 5.42564px 4.34051px rgb(102 6 173/6%),
    0 2.25773px 1.80619px rgb(102 6 173/4%);
  cursor: pointer;

  &:hover {
    background-color: #6606ad;
    opacity: 0.7;
    box-shadow: none;
  }
`;
const SignUpWrap = styled.div`
  margin-top: 0.5rem;

  p {
    color: #8b8b8b;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    gap: 0.5rem;
  }

  a {
    color: #6606ad;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Login;
