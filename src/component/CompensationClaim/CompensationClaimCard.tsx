import React from 'react';
import {
  CardContainer,
  CardInfo,
  Status,
  Details,
  Wrapper,
  UpWrapper,
  Name
} from './CardStyles';
import { CompensationClaimProps } from './CompensationClaimProps';

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
            <Name>{insuranceName}</Name>({isAlreadySurvey} &&{' '}
            <Status>손해사정 완료</Status>)(!{isAlreadySurvey} &&{' '}
            <Status>손해사정 중</Status>)
          </Wrapper>
          <p>{insuranceType} 보험</p>
        </CardInfo>
      </UpWrapper>
      <Details>
        <p>자세히 보기</p>
      </Details>
    </CardContainer>
  );
};

export default CompensationClaimCard;
