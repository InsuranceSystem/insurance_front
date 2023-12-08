import React from 'react';
import * as Styled from './LoginStyles';

interface LoginModalContentProps {
  id: string;
  password: string;
  handleIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loginError: string | null;
  handleLogin: () => void;
}

const HeaderModalContent: React.FC<LoginModalContentProps> = ({
  id,
  password,
  handleIdChange,
  handlePasswordChange,
  loginError,
  handleLogin
}) => {
  return (
    <Styled.ModalWrapper>
      <Styled.LoginBoxWrapper>
        <Styled.LoginBox>
          <h1>아이디</h1>
          <input value={id} onChange={handleIdChange} />
        </Styled.LoginBox>
        <Styled.LoginBox>
          <h1>비밀번호</h1>
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </Styled.LoginBox>
        {loginError && <Styled.ErrorBox>{loginError}</Styled.ErrorBox>}
      </Styled.LoginBoxWrapper>
      <Styled.Lines />
      <Styled.ButtonBox>
        <Styled.LoginButton onClick={handleLogin}>로그인</Styled.LoginButton>
      </Styled.ButtonBox>
    </Styled.ModalWrapper>
  );
};

export default HeaderModalContent;
