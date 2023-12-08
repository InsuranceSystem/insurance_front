import React from 'react';
import {
  CardContainer,
  CardInfo,
  Wrapper,
  UpWrapper,
  Name
} from '../../../component/CardStyle/CardStyles';
import UserProps from '../../../component/Props/UserProps';
import styled from 'styled-components';
import axios from 'axios';

const UserCard = ({
  id,
  name,
  birth,
  gender,
  pnumber,
  address,
  job,
  customerRole
}: UserProps) => {
  return (
    <CardContainer>
      <UpWrapper>
        <CardInfo>
          <Wrapper>
            <Name>{name}</Name>
          </Wrapper>
          <p>
            생년월일 {birth} · {gender}성 · {job}
          </p>
          <p>주소 : {address}</p>
          <p>전화번호 : {pnumber}</p>
        </CardInfo>
      </UpWrapper>
    </CardContainer>
  );
};

export default UserCard;

const Status = styled.button`
  height: 33px;
  flex-shrink: 0;
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 10px;
  border: none;
  background: rgba(255, 122, 122, 0.1);
  color: #ff4141;
  leading-trim: both;
  text-edge: cap;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 33px;
  align-items: center;
  text-align: center;
  margin-top: 15px;
  font-family: 'GmarketSansMedium';
  margin-left: auto;
  &:hover {
    background-color: #ff4141;
    color: #ffffff;
  }
`;
