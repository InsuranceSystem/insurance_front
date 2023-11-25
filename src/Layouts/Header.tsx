import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { useAuth } from '../pages/Login/AuthContext';
import LoginModal from '../pages/Login/LoginModal';
import Modal from '../component/Modal/Modal';
const Header = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const { user, login, loginError } = useAuth();
  // const handleEmailChange = (e: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setEmail(e.target.value);
  // };
  // const handleLogin = async () => {
  //   try {
  //     await login(email, password);
  //     if (localStorage.getItem('accessToken') !== null) {
  //       closeModal();
  //     }
  //   } catch (error) {
  //     console.log('로그인 에러', loginError);
  //     console.log('Login error', error);
  //   }
  // };
  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };
  // const modalContent = (
  //   <LoginModal
  //     email={email}
  //     password={password}
  //     handleEmailChange={handleEmailChange}
  //     handlePasswordChange={handlePasswordChange}
  //     loginError={loginError}
  //     handleLogin={handleLogin}
  //   />
  // );
  // const openModal = () => {
  //   setIsLoginModalOpen(true);
  // };
  //
  // const closeModal = () => {
  //   setIsLoginModalOpen(false);
  // };
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
              <ScrollIndex>내 계약 관리</ScrollIndex>
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
      {/*{isLoginModalOpen && (*/}
      {/*  <Modal*/}
      {/*    closeModal={closeModal}*/}
      {/*    width={'30.1875rem'}*/}
      {/*    height={'fit-content'}*/}
      {/*    header={'놀명뭐하니 로그인'}*/}
      {/*    children={modalContent}*/}
      {/*    description={*/}
      {/*      '놀명뭐하니는 명지대학교 동아리, 학생 단체, 소모임을 위한 공간이에요.'*/}
      {/*    }*/}
      {/*  />*/}
      {/*)}*/}
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
  }
  width: 100%;
  height: 3.25rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(3.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 0;
`;

const HeaderUl = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin-top: 30px;
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

  .nav-link {
    color: rgba(0, 0, 0, 0.3);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .nav-linka,
  .nav-link:hover {
    color: rgba(0, 47, 213, 0.8);
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
  width: 1250px;
  color: #fff;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 15px;
  margin-left: 10 auto;
`;
