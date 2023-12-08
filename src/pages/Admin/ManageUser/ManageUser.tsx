import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import '../../../App.css';
import axios from 'axios';
import UserCard from './UserCard';
import UserProps from '../../../component/Props/UserProps';
import UserManageSideBar from '../../../Layouts/Sidabar/UserManageSideBar';

const ManageUser = () => {
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [selectedIsOnSale, setSelectedIsOnSale] = useState(true);
  const [selectedIsManager, setSelectedIsManager] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  useEffect(() => {
    axios
      .get(
        'https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/customers/all'
      )
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          setUserData(response.data.data);
        } else {
          console.error('userData not available:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching userData:', error);
      });
  }, [forceRefresh]);
  const filteredUserData: UserProps[] = userData.filter((user) => {
    const userMatch = !selectedIsManager
      ? user.customerRole === 'CUSTOMER'
      : user.customerRole === 'ADMIN';
    return userMatch;
  });
  const handleForceRefresh = () => {
    setForceRefresh((prevState) => !prevState); // 상태 변경으로 하위 컴포넌트 리렌더링 유도
  };
  return (
    <Wrapper>
      <Content>
        <Introduction>
          <h2>사용자 계정 관리</h2>
        </Introduction>
        <UserManageSideBar
          setSelectedIsManager={setSelectedIsManager}
          selectedIsManager={selectedIsManager}
        />
        <CardList>
          {filteredUserData.map((user) => {
            return (
              <CardContainer key={user.id}>
                <UserCard
                  key={user.id}
                  handleForceRefresh={handleForceRefresh}
                  {...user}
                />
              </CardContainer>
            );
          })}
        </CardList>
      </Content>
    </Wrapper>
  );
};

export default ManageUser;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Introduction = styled.div`
  margin-left: 50px;
  h2 {
    margin-top: 70px;
    color: rgba(0, 0, 0, 1);
    leading-trim: both;
    text-edge: cap;
    font-family: 'GmarketSansMedium';
    font-size: 23px;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    margin-bottom: 18px;
    margin-right: 990px;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 21px;
  width: 1230px;
`;

const CardContainer = styled.div`
  width: 360px;
  height: 190px;
  margin-top: 8px;
  margin-left: 45px;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid #dbdbdf;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
    color: rgba(0, 0, 0, 0.95);
    box-shadow: 0px 4px 30px 3px rgba(76, 76, 255, 0.25);
  }
`;
