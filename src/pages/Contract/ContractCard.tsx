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
import { ContractProps } from '../../component/Props/ContractProps';

const ContractCard = ({
  insuranceName,
  insuranceType,
  insurancePeriod,
  premium
}: ContractProps) => {
  return (
    <CardContainer>
      <UpWrapper>
        <CardInfo>
          <Wrapper>
            <Name>{insuranceName}</Name>
            <Status>{insuranceType} 보험</Status>
          </Wrapper>
          <p>
            {insurancePeriod} 후 만료 · 보험료 {premium}
          </p>
        </CardInfo>
      </UpWrapper>
      <Details>
        <p>자세히 보기</p>
      </Details>
    </CardContainer>
  );
};

export default ContractCard;
