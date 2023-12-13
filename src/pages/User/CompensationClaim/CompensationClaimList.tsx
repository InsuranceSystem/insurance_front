import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import '../../../App.css';
import CompensationClaimCard from './CompensationClaimCard';
import { CompensationClaimProps } from '../../../component/Props/CompensationClaimProps';
import Sidebar from '../../../Layouts/Sidabar/CompensationSidebar';
import axios from 'axios';

const ContractList = () => {
  const [CompensationClaimData, setCompensationClaimData] = useState<
    CompensationClaimProps[]
  >([]);
  const [selectedIsProceeding, setSelectedIsProceeding] = useState(false);
  const [selectedIsCompleted, setSelectedIsCompleted] = useState(false);
  useEffect(() => {
    const id = localStorage.getItem('id');
    const NumId = Number(id);
    axios
      .get(`/api/compensation-claim/${NumId}`)
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          setCompensationClaimData(response.data.data);
        } else {
          console.error(
            'CompensationClaimData list data not available:',
            response.data
          );
        }
      })
      .catch((error) => {
        console.error('Error fetching setCompensationClaim :', error);
      });
  }, []);
  const filteredCompensationData: CompensationClaimProps[] =
    CompensationClaimData.filter((compensation) => {
      if (selectedIsProceeding && !selectedIsCompleted) {
        return !compensation.surveyed;
      } else if (!selectedIsProceeding && selectedIsCompleted) {
        return compensation.surveyed;
      }
      return true;
    });
  return (
    <Wrapper>
      <Content>
        <Introduction>
          <h2>내가 청구한 보상</h2>
        </Introduction>
        <Sidebar
          selectedIsProceeding={selectedIsProceeding}
          setSelectedIsProceeding={setSelectedIsProceeding}
          selectedIsCompleted={selectedIsCompleted}
          setSelectedIsCompleted={setSelectedIsCompleted}
        />
        <CardList>
          {filteredCompensationData.map((compensation) => {
            return (
              <CardContainer key={compensation.id}>
                <CompensationClaimCard {...compensation} />
              </CardContainer>
            );
          })}
        </CardList>
      </Content>
    </Wrapper>
  );
};

export default ContractList;

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
    margin-right: 1000px;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 41px;
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
