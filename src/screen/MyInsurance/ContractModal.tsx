import React, { useEffect, useState } from 'react';
import {
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  Title,
  SubTitle,
  Description,
  Content,
  Basic,
  Description2,
  SupportButton
} from '../Retreive/ModalStyle';
import scrollbar from '../../assets/scrollBar.svg';
import styled from 'styled-components';
import axios from 'axios';
import { InsuranceProps } from '../../component/Insurance/InsuranceProps';
import { TermsProps } from '../../component/Insurance/TermsProps';
type RecruitmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedInsuranceId: null;
};
const ModalBody = styled.div`
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  width: 839px;
  height: 685px;
  scrollbar-width: none; /* Remove default scrollbar */
  &::-webkit-scrollbar {
    width: 4px; /* Set width of the new custom scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    background-image: url(${scrollbar});
    background-repeat: no-repeat;
    background-size: 4px 134px;
    border-radius: 2px; /* Rounded corners for the thumb */
  }
`;
const ContractModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  selectedInsuranceId
}) => {
  if (!isOpen) {
    return null;
  }
  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [insuranceData, setInsuranceData] = useState<InsuranceProps | null>(
  //   null
  // );
  //const [termsData, setTermsData] = useState<TermsProps[]>(
  //   []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   axios
  //     .get(`api/group/${selectedInsuranceId}`)
  //     .then((response) => {
  //       if (response.data.data) {
  //         setInsuranceData(response.data.data);
  //       } else {
  //         console.error(response.data.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching group data:', error);
  //     });
  // }, [selectedInsuranceId]);
  // useEffect(() => {
  //   axios
  //     .get(`api/terms/{id}`)
  //     .then((response) => {
  //       if (response.data.data) {
  //         setTermsData(response.data.data);
  //       } else {
  //         console.error(response.data.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching group data:', error);
  //     });
  // }, [selectedInsuranceId]);
  const insuranceData: InsuranceProps = {
    id: '1',
    insuranceName: '보험상품 1',
    type: '자동차',
    maxCompensation: 10000,
    periodOfInsurance: '1년',
    paymentCycle: '매월',
    paymentPeriod: '10년',
    ageOfTarget: '30-50세',
    basicPremium: 500,
    rate: '5%',
    distributionStatus: true,
    authorization: true,
    TermsIDList: '1,2,3',
    insuranceClausePeriod: '10년',
    precaution: '주의사항 1'
  };
  const termsData: TermsProps[] = [
    {
      termsID: '1',
      termsName: '보험약관1',
      calculatedMoneyMethod: '합의 지급',
      termsContent: '자동차 사고로 인한 손해배상'
    },
    {
      termsID: '2',
      termsName: '보험약관2',
      calculatedMoneyMethod: '합의 지금',
      termsContent: '자동차 사고로 인한 손해배상'
    },
    {
      termsID: '3',
      termsName: '보험약관3',
      calculatedMoneyMethod: '합의 지급',
      termsContent: '자동차 사고로 인한 손해배상'
    },
    {
      termsID: '4',
      termsName: '보험약관4',
      calculatedMoneyMethod: '합의 지급',
      termsContent: '자동차 사고로 인한 손해배상'
    }
  ];
  if (!isOpen || !insuranceData) {
    return null;
  }
  const handlePayClick = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
    } else {
      window.location.href = `/Pay?state=${insuranceData.id}`;
    }
  };
  const handleClaimClick = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
    } else {
      window.location.href = `/Claim?state=${insuranceData.id}`;
    }
  };
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <ModalContent>
          <ModalBody>
            <Title>{insuranceData.insuranceName}</Title>
            <Description2>
              <SubTitle>최대 보장한도</SubTitle>
              <Basic>{insuranceData.maxCompensation}</Basic>
            </Description2>
            <Description2>
              <SubTitle>납입 기간</SubTitle>
              <Basic>{insuranceData.paymentPeriod}</Basic>
            </Description2>
            <Description2>
              <SubTitle>납입 주기</SubTitle>
              <Basic>{insuranceData.paymentCycle}</Basic>
            </Description2>
            <Description2>
              <SubTitle>배당여부</SubTitle>
              {insuranceData.distributionStatus && <Basic>O</Basic>}
              {!insuranceData.distributionStatus && <Basic>X</Basic>}
            </Description2>
            <Description2>
              <SubTitle>추천 연령</SubTitle>
              <Basic>{insuranceData.ageOfTarget}</Basic>
            </Description2>
            <Description>
              <SubTitle>보장 약관</SubTitle>
              {termsData.map((terms, index) => (
                <div key={terms.termsID}>
                  <Basic>
                    {terms.termsName} | {terms.calculatedMoneyMethod} ·{' '}
                    {terms.termsContent}
                  </Basic>
                </div>
              ))}
            </Description>
            <Description2>
              <SubTitle>주의 사항</SubTitle>
              <Content>{insuranceData.precaution}</Content>
            </Description2>
            <Wrapper>
              <SupportButton onClick={handleClaimClick}>
                보상금 청구
              </SupportButton>
              <SupportButton onClick={handlePayClick}>
                보험료 납부
              </SupportButton>
            </Wrapper>
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default ContractModal;

const Wrapper = styled.div`
  display: flex;
`;
