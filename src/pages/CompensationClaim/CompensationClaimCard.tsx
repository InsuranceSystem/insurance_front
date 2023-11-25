import React from 'react';
import {
  CardContainer,
  CardInfo,
  Details,
  FileButton,
  Wrapper,
  UpWrapper,
  Name,
  commonButtonStyles
} from '../../component/Card/CardStyles';
import { CompensationClaimProps } from '../../component/Props/CompensationClaimProps';
import styled from 'styled-components';

const CompensationClaimCard = ({
  insuranceName,
  insuranceType,
  isAlreadySurvey
}: CompensationClaimProps) => {
  return (
    <CardContainer>
      <UpWrapper>
        <CardInfo>
          <Wrapper>
            <Name>{insuranceName}</Name>
            {isAlreadySurvey ? (
              <Status isAlreadySurvey={isAlreadySurvey}>처리 완료</Status>
            ) : (
              <Status isAlreadySurvey={isAlreadySurvey}>처리 중</Status>
            )}
          </Wrapper>
          <p>{insuranceType} 보험</p>
        </CardInfo>
      </UpWrapper>
      <FileButton>신청서 조회</FileButton>
      <ResultButton approval={isAlreadySurvey}>결과 조회</ResultButton>
    </CardContainer>
  );
};

export default CompensationClaimCard;

const Status = styled.span<{ isAlreadySurvey: boolean }>`
  height: 27px;
  flex-shrink: 0;
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 10px;
  background: ${({ isAlreadySurvey }) =>
    isAlreadySurvey ? 'rgba(255, 122, 122, 0.1)' : 'rgba(161, 161, 161, 0.10)'};
  color: ${({ isAlreadySurvey }) => (isAlreadySurvey ? '#ff4141' : '#87888B')};
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
const ResultButton = styled.button<{ approval: boolean }>`
  ${commonButtonStyles}
  background: ${({ approval }) =>
    approval ? 'rgba(0, 47, 213, 0.05)' : '#f1f3f5'};
  color: ${({ approval }) => (approval ? '#002fd5' : '#87888B')};
  cursor: ${({ approval }) => (approval ? 'pointer' : 'not-allowed')};
  &:hover {
    background-color: ${({ approval }) => (approval ? '#002fd5' : '#f1f3f5')};
    color: ${({ approval }) => (approval ? '#ffffff' : '#87888B')};
  }
`;
