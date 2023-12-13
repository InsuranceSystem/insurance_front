import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import '../../../App.css';
import ApplicationCard from './ApplicationCard';
import { ApplicationProps } from '../../../component/Props/ApplicationProps';
import ApplicationManageSideBar from '../../../Layouts/Sidabar/ApplicationManageSideBar';
import axios from 'axios';

const ManageApplication = () => {
  const [selectedIsApproval, setSelectedIsApproval] = useState(true);
  const [applicationData, setApplicationData] = useState<ApplicationProps[]>(
    []
  );
  useEffect(() => {
    axios
      .get('/api/insurance-applications')
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          setApplicationData(response.data.data);
        } else {
          console.error(
            'ApplyInsurance list data not available:',
            response.data
          );
        }
      })
      .catch((error) => {
        console.error('Error fetching application history:', error);
      });
  }, []);
  const updateApplicationData = () => {
    axios
      .get('/api/insurance-applications')
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          setApplicationData(response.data.data);
        } else {
          console.error(
            'ApplyInsurance list data not available:',
            response.data
          );
        }
      })
      .catch((error) => {
        console.error('Error fetching application history:', error);
      });
  };
  const filteredApplicationData: ApplicationProps[] = applicationData.filter(
    (application) => {
      const authorizationMatch = selectedIsApproval
        ? application.state === 'PROCESSING'
        : application.state !== 'PROCESSING';
      return authorizationMatch;
    }
  );
  return (
    <Wrapper>
      <Content>
        <Introduction>
          <h2>가입 신청서 관리</h2>
        </Introduction>
        <ApplicationManageSideBar
          selectedIsApproval={selectedIsApproval}
          setSelectedIsApproval={setSelectedIsApproval}
        />
        <CardList>
          {filteredApplicationData.map((data) => {
            return (
              <CardContainer key={data.insuranceApplicationID}>
                <ApplicationCard
                  {...(data as ApplicationProps)}
                  updateApplicationData={updateApplicationData}
                />
              </CardContainer>
            );
          })}
        </CardList>
      </Content>
    </Wrapper>
  );
};

export default ManageApplication;

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
    margin-right: 1030px;
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
