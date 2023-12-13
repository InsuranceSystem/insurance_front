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
  PayButton,
  ClaimButton,
  SubTitle2,
  BorderLine
} from '../../../component/ModalStyle/ModalStyle';
import scrollbar from '../../../assets/scrollBar.svg';
import styled from 'styled-components';
import axios from 'axios';
import { ContractProps } from '../../../component/Props/ContractProps';
import { ApplicationResultProps } from '../../../component/Props/ApplicationResultProps';
type RecruitmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedContractId: string | null;
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
const CustomerInfoModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  selectedContractId
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
    const id = Number(selectedContractId);
    axios
      .get(`/api/insurance-applications/${id}/result`)
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
  }, [selectedContractId]);
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

export default CustomerInfoModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
