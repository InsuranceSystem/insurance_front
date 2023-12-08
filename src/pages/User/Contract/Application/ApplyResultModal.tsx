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
  SupportButton,
  ClaimButton,
  PayButton
} from '../../../../component/ModalStyle/ModalStyle';
import scrollbar from '../../../../assets/scrollBar.svg';
import styled from 'styled-components';
import axios from 'axios';
import { ApplicationResultProps } from '../../../../component/Props/ApplicationResultProps';
import { ContractProps } from '../../../../component/Props/ContractProps';
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
const ApplyResultModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  selectedCompensationId
}) => {
  const [ResultData, setResultData] = useState<ApplicationResultProps | null>(
    null
  );
  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const id = Number(selectedCompensationId);
    axios
      .get(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/insurance-applications/${id}/result`
      )
      .then((response) => {
        if (response.data.data) {
          setResultData(response.data.data);
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  }, [selectedCompensationId]);
  const ContractData: ContractProps = {
    id: '10',
    insuranceName: 'Accident Insurance',
    insuranceType: 'Personal Accident',
    insurancePeriod: '5 years',
    premium: 200,
    paymentCycle: 'Quarterly',
    paymentPeriod: '1년',
    maxCompensation: '200,000',
    dateOfSubscription: '2022-08-08',
    dateOfMaturity: '2027-08-08',
    maturity: true,
    resurrection: false,
    cancellation: false
  };
  if (!isOpen || !ResultData) {
    return null;
  }
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <ModalContent>
          <ModalBody>
            <Title>결과조회</Title>
            <Description2>
              <SubTitle>결과</SubTitle>
              {ResultData.state === 'APPROVAL' ? (
                <Basic>신청 승인</Basic>
              ) : (
                <Basic>신청 거절</Basic>
              )}
            </Description2>
            {ResultData.state === 'APPROVAL' ? (
              <>
                <Description2>
                  <SubTitle>보험료</SubTitle>
                  <Basic>{ResultData.premium}</Basic>
                </Description2>
                <Description2>
                  <SubTitle>납입 기간</SubTitle>
                  <Basic>{ResultData.paymentPeriod}</Basic>
                </Description2>
              </>
            ) : null}
            <Description2>
              <SubTitle>결정 사유</SubTitle>
              <Basic>{ResultData.reasonOfApproval}</Basic>
            </Description2>
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default ApplyResultModal;
