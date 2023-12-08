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
  customerRole,
  handleForceRefresh
}: UserProps & { handleForceRefresh: () => void }) => {
  const handleAdminClick = async () => {
    const setAdmin = true;
    const numId = Number(id);
    try {
      const response = await axios.patch(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/customers/${numId}/admin?setAdmin=${setAdmin}`
      );
      console.log('API 응답:', response.data);
      if (response.status === 200) {
        alert('직원으로 등록되었습니다.');
        handleForceRefresh();
      } else {
        alert('직원 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  };
  const handleNotAdminClick = async () => {
    const setAdmin = false;
    const numId = Number(id);
    try {
      const response = await axios.patch(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/customers/${numId}/admin?setAdmin=${setAdmin}`
      );
      console.log('API 응답:', response.data);
      if (response.status === 200) {
        alert('해제되었습니다.');
        handleForceRefresh();
      } else {
        alert('직원 해제에 실패했습니다.');
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  };
  return (
    <CardContainer>
      <UpWrapper>
        <CardInfo>
          <Wrapper>
            <Name>{name}</Name>
            {customerRole === 'CUSTOMER' ? (
              <Status onClick={handleAdminClick}>직원 등록</Status>
            ) : (
              <Status onClick={handleNotAdminClick}>등록 해제</Status>
            )}
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
