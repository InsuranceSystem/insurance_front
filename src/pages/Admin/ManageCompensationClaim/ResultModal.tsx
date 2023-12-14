import React, { useEffect, useState } from 'react';
import {
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  Title,
  SubTitle,
  Basic,
  Description2,
  SupportButton
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
const ResultModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  selectedCompensationId
}) => {
  const [Survey, setSurvey] = useState<SurveyProps | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    axios
      .get(`/api/survey/${selectedCompensationId}`)
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
  useEffect(() => {
    const id = localStorage.getItem('id');
    axios
      .get(`/api/customers/${id}/admin`)
      .then((response) => {
        if (response) {
          setIsAdmin(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  }, [selectedCompensationId]);
  if (!isOpen || !Survey) {
    return null;
  }
  const handleClick = () => {
    alert('보험금 지급 신청이 완료되었습니다.');
  };
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
              <SubTitle>손해사정 비용</SubTitle>
              <Basic>{Survey.surveyFee}</Basic>
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
            <SupportButton onClick={handleClick}>보험금 지급</SupportButton>
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default ResultModal;

const Wrapper = styled.div`
  display: flex;
`;
