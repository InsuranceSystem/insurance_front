import styled from 'styled-components';

export const ModalWrapper = styled.div``;

export const LoginBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 0.94rem;
  div {
    font-size: 0.675rem;
  }

  h1 {
    color: #000;
    text-align: center;

    font-size: 0.675rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 3.625rem;
    margin-right: 1.2rem;
  }

  input {
    width: 14.5625rem;
    height: 1.8875rem;
    padding-left: 0.94rem;
    padding-right: 0.94rem;
    outline: none;
    border-radius: 0.625rem;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    background: #fff;
    margin-right: 1rem;
  }

  input:last-child {
    margin-right: -1rem;
    width: 20.6875rem;
  }

  input::placeholder {
    color: rgba(0, 0, 0, 0.3);
    font-family: Gmarket Sans TTF;
    font-size: 0.375rem;
    font-weight: 500;
  }
`;

export const Lines = styled.div`
  width: 28.875rem;
  height: 0.01875rem;
  background: rgba(0, 0, 0, 0.3);
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const ErrorBox = styled.div`
  color: red;
  width: 100%;
  text-align: right;
  font-size: 10px;
  padding-inline-end: 3rem;
`;
export const LoginButton = styled.button`
  font-family: 'GmarketSansMedium';
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  width: 104px;
  height: 40px;
  line-height: 30px;
  border-radius: 15px;
  background: rgba(0, 47, 213, 0.05);
  color: #002fd5;
  border: none;
  margin-left: 10px;
  /* 활성화된 버튼 스타일 */
  &:hover:not([disabled]) {
    background-color: #002fd5;
    color: #ffffff;
  }

  /* 비활성화된 버튼 스타일 */
  &:disabled {
    pointer-events: none; /* 이벤트 비활성화 */
    opacity: 0.5; /* 비활성화 시 투명도 조정 (선택사항) */
  }

  &:active {
    color: #002fd5;
  }
`;

export const HeaderWrapper = styled.div`
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
  z-index: 1000;
  position: fixed;
  top: 0;
`;

export const JoinBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    color: #000;
    font-family: Gmarket Sans TTF;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-right: 1rem;
  }

  h4 {
    color: #32a9eb;
    border-bottom: 1px solid #32a9eb;
    font-family: Gmarket Sans TTF;
    font-size: 0.6875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
export const HeaderUl = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: 35.56rem;

  li:first-child {
    :link,
    :visited,
    :hover {
      color: black;
    }
    padding-right: 1.94rem;
  }
`;

export const HeaderLink = styled.div`
  display: flex;
  align-items: center;

  li:first-child {
    margin-right: 3.19rem;
  }

  .nav-link {
    color: rgba(0, 0, 0, 0.3);
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .nav-linka,
  .nav-link:hover {
    color: rgba(0, 143, 213, 0.8);
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding-bottom: 0.89rem;
    border-bottom: 0.16rem solid #008fd5;
    transition: color 0.1s ease-out;
  }
`;

export const HeaderUser = styled.div`
  display: flex;
  align-items: center;

  .login {
    margin-right: 1.57rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    color: rgba(0, 0, 0, 0.8);
  }

  .login:hover {
    background: rgba(237, 237, 237, 0.5);
    transition: all 0.2s ease-in;
  }

  .signUp {
    color: #008fd5;
    background: rgba(0, 143, 213, 0.05);
  }

  .signUp:hover {
    background: rgba(0, 143, 213, 0.05);
    box-shadow: 0px 0px 20px 0px rgba(0, 143, 213, 0.25);
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

  .logina {
  }
`;

export const Line = styled.div`
  margin-left: 3.2rem;
  margin-right: 3.2rem;
  width: 0.0625rem;
  height: 1.875rem;
  background: #00000024;
  border-radius: 2rem;
`;

export const PostWrapper = styled.div`
  width: 6.625rem;
  height: 2.475rem;
  border-radius: 0.9375rem;
  background: rgba(0, 143, 213, 0.1);
  display: flex;
  align-items: center;
  margin-left: 1.61rem;
  padding-left: 0.62rem;
  margin-right: 1.61rem;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 3px 10px 0px rgba(0, 143, 213, 0.2);
  }

  div {
    background-color: #008fd5;
    width: 1.9625rem;
    height: 1.9625rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 1rem;
    height: 1rem;
  }

  h2 {
    margin-left: 0.55rem;
    color: #008fd5;
    font-family: GmarketSansMedium;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
  }
`;

export const UserWrapper = styled.div`
  background-color: red6;
  display: flex;
  align-items: center;
  margin-left: -2rem;
  li {
    display: flex;
    align-items: center;
  }
`;
export const UserProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  &:hover {
    transition: fill 0.3s ease-in-out;
    background-color: rgba(200, 200, 200, 0.3);
    border-radius: 50%;
  }
`;

export const IconHover1 = styled.div`
  position: absolute;
  bottom: -2rem;

  padding: 0.3rem 0.8rem;
  border-radius: 0.5rem;
  background: rgba(57, 57, 57, 0.9);
  backdrop-filter: blur(2px);
  color: #fff;
  font-family: Gmarket Sans TTF;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
`;

export const IconHover2 = styled.div`
  position: absolute;
  bottom: -2rem;

  padding: 0.3rem 0.8rem;
  border-radius: 0.5rem;
  background: rgba(57, 57, 57, 0.9);
  backdrop-filter: blur(2px);
  color: #fff;
  font-family: Gmarket Sans TTF;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
`;

export const PostModalContentWrapper = styled.div``;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30rem;
  height: 3.1875rem;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background-color: rgba(0, 0, 0, 0.08);
  padding: 0 1rem;
  margin-bottom: 0.3rem;
  cursor: pointer;

  &:hover {
    background-color: white;
    transition: all 0.1s ease-in-out;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

export const PostText = styled.div`
  color: #000;
  font-family: Gmarket Sans TTF;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const PostImg = styled.img`
  width: 1.4375rem;
  height: 1.4375rem;
  flex-shrink: 0;
  margin-right: 0.69rem;
`;

export const LinkImg = styled.img``;
