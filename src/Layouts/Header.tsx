import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import LoginModal from '../pages/Login/LoginModal';
import Modal from '../component/ModalStyle/Modal';
import axios from 'axios';
import UserProps from '../component/Props/UserProps';
import Swal from 'sweetalert2';
const Header = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const handleIdChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setId(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const logout = () => {
    // 세션 스토리지에서 로그인 정보 삭제
    document.cookie = 'JSESSIONID=; Max-Age=0; path=/';
    // 유저 정보 초기화
    setUser(null);
    // 관리자 여부 초기화
    setIsAdmin(false);
    localStorage.removeItem('id');
    navigate('/user/retrieve');
  };
  const login = async (email: string, password: string) => {
    const formData = new FormData();
    // formData.append('loginId', email);
    // formData.append('password', password);

    formData.append('loginId', email);
    formData.append('password', password);
    for (const key of formData.keys()) {
      console.log(key, ':', formData.get(key));
    }
    try {
      const response = await axios.post(
        'https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/login',
        formData,
        { withCredentials: true }
      );
      console.log(response);
      checkAdmin(response.data.userId);
      getUserInfo(response.data.userId);
      localStorage.setItem('id', response.data.userId);
      closeModal();
    } catch (error) {
      console.log('Login error:', error);
      setLoginError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };
  const handleLogin = async () => {
    try {
      await login(id, password);
    } catch (error) {
      console.log('로그인 에러', loginError);
      console.log('Login error', error);
    }
  };
  const getUserInfo = (id: string) => {
    axios
      .get(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/customers/${id}`
      )
      .then((response) => {
        console.log('getUserAPI 요청', response.data.data);
        setUser(response.data.data);
        setLoginError('');
        if (isAdmin) {
          navigate('/admin/insurance');
        } else {
          navigate('/user/retrieve');
        }
      })
      .catch((error) => {
        console.log('api/user/my 요청 실패', error);
      });
  };
  const checkAdmin = async (id: string) => {
    try {
      const adminResponse = await axios.get(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/customers/${id}/admin`
      );
      console.log(adminResponse.data.data);
      setIsAdmin(adminResponse.data.data); // 관리자 여부 설정
    } catch (error) {
      console.log('Admin verification error', error);
    }
  };
  const modalContent = (
    <LoginModal
      id={id}
      password={password}
      handleIdChange={handleIdChange}
      handlePasswordChange={handlePasswordChange}
      loginError={loginError}
      handleLogin={handleLogin}
    />
  );
  const openModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };
  const handleLogout = () => {
    logout();
    navigate('/user/retrieve'); // 로그아웃 후 홈페이지로 이동
  };
  const handleAdminMode = () => {
    setIsAdminMode(true);
    navigate('/admin/insurance');
  };
  const handleNotAdminMode = () => {
    setIsAdminMode(false);
    navigate('/user/retrieve');
  };
  const handleContractManagement = () => {
    if (!localStorage.getItem('id')) {
      Swal.fire({
        text: '로그인이 필요합니다.',
        icon: 'error',
        confirmButtonText: '닫기'
      });
    } else {
      navigate('/user/management');
    }
  };
  const checkAutoLogin = () => {
    const userId = localStorage.getItem('id');
    if (userId) {
      getUserInfo(userId);
      checkAdmin(userId);
    }
  };
  const handleCompensationClaim = () => {
    if (!localStorage.getItem('id')) {
      Swal.fire({
        text: '로그인이 필요합니다.',
        icon: 'error',
        confirmButtonText: '닫기'
      });
    } else {
      navigate('/user/CompensationClaim');
    }
  };
  useEffect(() => {
    checkAutoLogin();
  }, []);
  return (
    <HeaderWrapper>
      <HeaderUl>
        {isAdminMode ? (
          <>
            <HeaderLeft2>
              <li>
                <NavLink to='/user/retrieve' onClick={scrollToTop}>
                  <Title>에이쁠 보험</Title>
                </NavLink>
              </li>
            </HeaderLeft2>
          </>
        ) : (
          <>
            <HeaderLeft>
              <li>
                <NavLink to='/user/retrieve' onClick={scrollToTop}>
                  <Title>에이쁠 보험</Title>
                </NavLink>
              </li>
            </HeaderLeft>
          </>
        )}

        <HeaderLink>
          {isAdminMode ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? 'a' : '')
                  }
                  to='/admin/insurance'>
                  <ScrollIndex>보험 관리</ScrollIndex>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? 'a' : '')
                  }
                  to='/admin/Application'>
                  <ScrollIndex>보험 신청서 관리</ScrollIndex>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? 'a' : '')
                  }
                  to='/admin/CompensationClaim'>
                  <ScrollIndex>보상 청구서 관리</ScrollIndex>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? 'a' : '')
                  }
                  to='/admin/target'>
                  <ScrollIndex>고객 관리</ScrollIndex>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? 'a' : '')
                  }
                  to='/admin/user'>
                  <ScrollIndex>계정 관리</ScrollIndex>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? 'a' : '')
                  }
                  to='/user/retrieve'>
                  <ScrollIndex>보험 조회</ScrollIndex>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? 'a' : '')
                  }
                  onClick={handleContractManagement}
                  to='/user/management'>
                  <ScrollIndex>내 계약 관리</ScrollIndex>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? 'a' : '')
                  }
                  onClick={handleCompensationClaim}
                  to='/user/CompensationClaim'>
                  <ScrollIndex>보상 청구 조회</ScrollIndex>
                </NavLink>
              </li>
            </>
          )}

          {user ? (
            <HeaderUser2>
              <Wrapper>
                <li>
                  <a className='login'>{user.name}님</a>
                </li>
                <li>
                  <a className='signUp' onClick={handleLogout}>
                    로그아웃
                  </a>
                </li>
                {isAdmin ? (
                  isAdminMode ? (
                    <li>
                      <a className='change' onClick={handleNotAdminMode}>
                        사용자 페이지
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a className='change' onClick={handleAdminMode}>
                        관리자 페이지
                      </a>
                    </li>
                  )
                ) : null}
              </Wrapper>
            </HeaderUser2>
          ) : (
            <HeaderUser>
              <Wrapper>
                <li>
                  <a className='login' onClick={openModal}>
                    로그인
                  </a>
                </li>
                <li>
                  <NavLink className='signUp' to='/user/signUp'>
                    회원가입
                  </NavLink>
                </li>
              </Wrapper>
            </HeaderUser>
          )}
        </HeaderLink>
      </HeaderUl>
      {isLoginModalOpen && (
        <Modal
          closeModal={closeModal}
          width={'30.1875rem'}
          height={'fit-content'}
          header={'로그인'}
          children={modalContent}
        />
      )}
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
    margin-right: 10px;
    background: rgba(0, 47, 213, 0.05);
    color: rgba(0, 0, 0, 1);
  }
  .signUp:hover {
    background: rgba(0, 47, 213, 0.05);
    box-shadow: 0px 0px 20px 0px rgba(0, 47, 213, 0.5);
    transition: all 0.2s ease-in;
  }
  .change {
    margin-right: 10px;
    background: rgba(0, 47, 213, 0.05);
    color: rgba(0, 0, 0, 1);
  }
  .change:hover {
    background: rgba(0, 47, 213, 0.05);
    box-shadow: 0px 0px 20px 0px rgba(0, 47, 213, 0.5);
    transition: all 0.2s ease-in;
  }
  .login,
  .change,
  .signUp {
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 0.9625rem; /* 118.462% */
    border-radius: 0.9375rem;
    padding: 0.55rem 1.25rem;
  }
`;
const HeaderUser2 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 70px;
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
    margin-right: 10px;
    background: rgba(0, 47, 213, 0.05);
    color: rgba(0, 0, 0, 1);
  }
  .signUp:hover {
    background: rgba(0, 47, 213, 0.05);
    box-shadow: 0px 0px 20px 0px rgba(0, 47, 213, 0.5);
    transition: all 0.2s ease-in;
  }
  .change {
    margin-right: 10px;
    background: rgba(0, 47, 213, 0.05);
    color: rgba(0, 0, 0, 1);
  }
  .change:hover {
    background: rgba(0, 47, 213, 0.05);
    box-shadow: 0px 0px 20px 0px rgba(0, 47, 213, 0.5);
    transition: all 0.2s ease-in;
  }
  .login,
  .change,
  .signUp {
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 0.9625rem; /* 118.462% */
    border-radius: 0.9375rem;
    padding: 0.55rem 1.25rem;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
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
  margin-right: 300px;
  li:first-child {
    margin-right: 3rem;
  }
`;
const HeaderLeft2 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 70px;
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
