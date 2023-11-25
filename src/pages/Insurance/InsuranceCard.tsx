import React from 'react';
import {
  CardContainer,
  CardInfo,
  Status,
  Details,
  Wrapper,
  UpWrapper,
  Name
} from '../../component/Card/CardStyles';
import { InsuranceProps } from '../../component/Props/InsuranceProps';

const InsuranceCard = ({
  insuranceName,
  type,
  ageOfTarget,
  maxCompensation
}: InsuranceProps) => {
  const formattedMaxCompensation = Number(maxCompensation).toLocaleString();
  return (
    <CardContainer>
      <UpWrapper>
        <CardInfo>
          <Wrapper>
            <Name>{insuranceName}</Name>
            <Status>{type} 보험</Status>
          </Wrapper>
          <p>
            {ageOfTarget} 이상 추천 · 최대 보장한도 {formattedMaxCompensation}
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
