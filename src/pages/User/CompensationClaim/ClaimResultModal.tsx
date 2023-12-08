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
import { SurveyProps } from '../../../component/Props/SurveyProps';
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
const ClaimResultModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  selectedCompensationId
}) => {
  const [Survey, setSurvey] = useState<SurveyProps | null>(null);
  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/survey/${selectedCompensationId}`
      )
      .then((response) => {
        if (response.data.data) {
          setSurvey(response.data.data);
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  }, [selectedCompensationId]);
  if (!isOpen || !Survey) {
    return null;
  }
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <ModalContent>
          <ModalBody>
            <Title>청구결과</Title>
            <Description2>
              <SubTitle>담당자명</SubTitle>
              <Basic>{Survey.managerName}</Basic>
            </Description2>
            <Description2>
              <SubTitle>결정 보험금</SubTitle>
              <Basic>{Survey.decisionMoney}</Basic>
            </Description2>
            <Description2>
              <SubTitle>고객 책임 여부</SubTitle>
              {Survey.responsibility && <Basic>O</Basic>}
              {!Survey.responsibility && <Basic>X</Basic>}
            </Description2>
            {Survey.responsibility ? (
              <Description2>
                <SubTitle>면/부책 이유</SubTitle>
                <Basic>{Survey.responsibilityReason}</Basic>
              </Description2>
            ) : null}
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default ClaimResultModal;
