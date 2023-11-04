import React from 'react';
import {
  CardContainer,
  CardInfo,
  Status,
  Details,
  Wrapper,
  UpWrapper,
  Name
} from './InsuranceCardStyles';
import { InsuranceProps } from './InsuranceProps';

const InsuranceCard = ({
  insuranceName,
  type,
  ageOfTarget,
  maxCompensation
}: InsuranceProps) => {
  return (
    <CardContainer>
      <UpWrapper>
        <CardInfo>
          <Wrapper>
            <Name>{insuranceName}</Name>
            <Status>{type} 보험</Status>
          </Wrapper>
          <p>
            {ageOfTarget} 추천 · 최대 보장한도 {maxCompensation}
          </p>
        </CardInfo>
      </UpWrapper>
      <Details>
        <p>자세히 보기</p>
      </Details>
    </CardContainer>
  );
};

export default InsuranceCard;
