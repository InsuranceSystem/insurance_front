import React from 'react';
import {
  CardContainer,
  CardInfo,
  Details,
  FileButton,
  ResultButton,
  Wrapper,
  UpWrapper,
  Name
} from '../../component/Card/CardStyles';
import { ApplicationProps } from '../../component/Props/ApplicationProps';
import styled from 'styled-components';

const ApplicationCard = ({
  id,
  insuranceName,
  createdAt,
  insurancePeriod,
  premium,
  paymentCycle,
  maxCompensation,
  subscriptionFilePath,
  approval,
  reasonOfApproval
}: ApplicationProps) => {
  const handlePayClick = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
    } else {
      window.location.href = `/Result?state=${id}`;
    }
  };
  const handleClaimClick = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
    } else {
      window.location.href = `/Result?state=${id}`;
    }
  };
  return (
    <CardContainer>
      <UpWrapper>
        <CardInfo>
          <Wrapper>
            <Name>{insuranceName}</Name>
            <Status approval={approval}>
              {approval ? '심사 완료' : '심사 중'}
            </Status>
          </Wrapper>
          <p>
            {createdAt} 신청 · 납입 주기 {paymentCycle}
          </p>
        </CardInfo>
      </UpWrapper>
      <FileButton>청약서 조회</FileButton>
      <ResultButton approval={approval}>결과 조회</ResultButton>
    </CardContainer>
  );
};

export default ApplicationCard;

const Status = styled.span<{ approval: boolean }>`
  height: 27px;
  flex-shrink: 0;
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 10px;
  background: ${({ approval }) =>
    approval ? 'rgba(255, 122, 122, 0.1)' : 'rgba(161, 161, 161, 0.10)'};
  color: ${({ approval }) => (approval ? '#ff4141' : '#87888B')};
  leading-trim: both;
  text-edge: cap;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 29.5px;
  align-items: center;
  text-align: center;
  margin-top: 15px;
  font-family: 'GmarketSansMedium';
  margin-left: auto;
`;
