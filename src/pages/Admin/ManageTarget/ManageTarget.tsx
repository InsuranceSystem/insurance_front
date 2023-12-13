import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import '../../../App.css';
import axios from 'axios';
import UserCard from './UserCard';
import UserProps from '../../../component/Props/UserProps';
import TargetSidebar from '../../../Layouts/Sidabar/TargetSidebar';

const ManageTarget = () => {
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [selectedIsEXPIRED, setSelectedIsEXPIRED] = useState(true);
  const [selectedIsUNPAID, setSelectedIsUNPAID] = useState(false);
  const [selectedIsRESURRECT, setSelectedIsRESURRECT] = useState(false);
  useEffect(() => {
    let targetType = '';

    if (selectedIsEXPIRED) {
      targetType = 'EXPIRED_CONTRACTS';
    } else if (selectedIsUNPAID) {
      targetType = 'UNPAID_CUSTOMERS';
    } else if (selectedIsRESURRECT) {
      targetType = 'RESURRECT_CANDIDATES';
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/customers/contract-maintenance?targetType=${targetType}`
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchData();
  }, [selectedIsEXPIRED, selectedIsUNPAID, selectedIsRESURRECT]);
  return (
    <Wrapper>
      <Content>
        <Introduction>
          <h2>대상 고객 조회</h2>
        </Introduction>
        <TargetSidebar
          selectedIsEXPIRED={selectedIsEXPIRED}
          setSelectedIsEXPIRED={setSelectedIsEXPIRED}
          selectedIsUNPAID={selectedIsUNPAID}
          setSelectedIsUNPAID={setSelectedIsUNPAID}
          selectedIsRESURRECT={selectedIsRESURRECT}
          setSelectedIsRESURRECT={setSelectedIsRESURRECT}
        />
        <CardList>
          {userData.map((user) => {
            return (
              <CardContainer key={user.id}>
                <UserCard key={user.id} {...user} />
              </CardContainer>
            );
          })}
        </CardList>
      </Content>
    </Wrapper>
  );
};

export default ManageTarget;

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
