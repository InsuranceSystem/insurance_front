import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
const Header = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <HeaderWrapper>
      <HeaderUl>
        <HeaderLeft>
          <li>
            <NavLink to='/' onClick={scrollToTop}>
              <Title>에이쁠 보험</Title>
            </NavLink>
          </li>
        </HeaderLeft>
        <HeaderLink>
          <li>
            <NavLink
              className={({ isActive }) => 'nav-link' + (isActive ? 'a' : '')}
              to='/retrieve'>
              <ScrollIndex>보험 조회</ScrollIndex>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => 'nav-link' + (isActive ? 'a' : '')}
              to='/management'>
              <ScrollIndex>내 보험 관리</ScrollIndex>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => 'nav-link' + (isActive ? 'a' : '')}
              to='/CompensationClaim'>
              <ScrollIndex>보상 청구 조회</ScrollIndex>
            </NavLink>
          </li>
          <HeaderUser>
            <li>
              <a className='login'>로그인</a>
            </li>
            <li>
              <NavLink className='signUp' to='/signUp'>
                회원가입
              </NavLink>
            </li>
          </HeaderUser>
        </HeaderLink>
      </HeaderUl>
      <BorderLine></BorderLine>
    </HeaderWrapper>
  );
};

export default Header;
const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  margin-left: 120px;
  .login {
    margin-right: 10px;
    background: rgba(0, 47, 213, 0.05);
    color: rgba(0, 0, 0, 1);
  }

  .login:hover {
    background: rgba(0, 47, 213, 0.05);
    box-shadow: 0px 0px 20px 0px rgba(0, 47, 213, 0.5);
    transition: all 0.2s ease-in;
  }

  .signUp {
    margin-right: 120px;
    background: rgba(0, 47, 213, 0.05);
    color: rgba(0, 0, 0, 1);
  }

  .signUp:hover {
    background: rgba(0, 47, 213, 0.05);
    box-shadow: 0px 0px 20px 0px rgba(0, 47, 213, 0.5);
    transition: all 0.2s ease-in;
  }

  .login,
  .signUp {
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 0.9625rem; /* 118.462% */
    border-radius: 0.9375rem;
    padding: 0.55rem 1.25rem;
  }
`;
const HeaderWrapper = styled.div`
  a:link,
  a:visited,
  a:hover {
    text-decoration: none;
    color: black;
  }
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #ffffff;
  position: fixed;
`;

const HeaderUl = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: 27.44rem;
  li:first-child {
    margin-right: 3rem;
  }
`;

const HeaderLink = styled.div`
  display: flex;
  align-items: center;

  li:first-child {
    margin-right: 10px;
  }

  .nav-link {
    color: rgba(0, 0, 0, 0.3);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .nav-link:hover {
    color: #002fd5;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding-bottom: 0.89rem;
    border-bottom: 0.16rem solid #008fd5;
    transition: color 0.1s ease-out;
  }
`;

const ScrollIndex = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  button:first-child {
    margin-right: 1.57rem;
  }
  img {
    margin-right: 1.57rem;
  }
`;
const Title = styled.div`
  margin-left: 150px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  button:first-child {
    margin-right: 1.57rem;
  }
  img {
    margin-right: 1.57rem;
  }
`;
const BorderLine = styled.hr`
  stroke-width: 2px;
  width: 1200px;
  color: #fff;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 20px;
`;
