import React, { useEffect, useState } from 'react';
import {
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  Title,
  SubTitle,
  Basic,
  Description2
} from '../../../component/ModalStyle/ModalStyle';
import scrollbar from '../../../assets/scrollBar.svg';
import styled from 'styled-components';
import axios from 'axios';
import { InsuranceProps } from '../../../component/Props/InsuranceProps';
type RecruitmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCompensationId: string | null;
};
const ModalBody = styled.div`
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  width: 839px;
  height: 585px;
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
const ClaimContentModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  selectedCompensationId
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
    ageOfTarget: '30-50세',
    basicPremium: 500,
    termsIdList: '1,2,3',
    distributionStatus: true,
    authorization: true,
    insuranceClausePeriod: '10년',
    precaution: '주의사항 1'
  };
  if (!isOpen || !insuranceData) {
    return null;
  }
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <ModalContent>
          <ModalBody>
            <Title>{insuranceData.insuranceName}</Title>
            <Description2>
              <SubTitle>내용</SubTitle>
              <Basic>{insuranceData.maxCompensation}</Basic>
            </Description2>
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default ClaimContentModal;
