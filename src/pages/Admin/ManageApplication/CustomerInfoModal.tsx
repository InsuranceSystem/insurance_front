import React, { useEffect, useState } from 'react';
import {
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  Title,
  SubTitle,
  SubTitle2,
  BorderLine,
  Basic,
  Description2,
  PayButton,
  ClaimButton,
  Description
} from '../../../component/ModalStyle/ModalStyle';
import scrollbar from '../../../assets/scrollBar.svg';
import styled from 'styled-components';
import axios from 'axios';
import { ContractProps } from '../../../component/Props/ContractProps';
import { ApplicationDetailProps } from '../../../component/Props/ApplicationDetailProps';
type RecruitmentModalProps = {
  isOpen: boolean;
  isApprove: boolean;
  onClose: () => void;
  selectedContractId: string | null;
  updateApplicationData: () => void;
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
  isApprove,
  onClose,
  selectedContractId,
  updateApplicationData
}) => {
  const [reason, setReason] = useState('');
  const [applicationData, setApplicationData] =
    useState<ApplicationDetailProps | null>(null);
  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const id = Number(selectedContractId);
    console.log(id);
    console.log(selectedContractId);
    axios
      .get(`/api/insurance-applications/${id}/detail`)
      .then((response) => {
        if (response.data.data) {
          setApplicationData(response.data.data);
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  }, [selectedContractId]);
  if (!isOpen || !applicationData) {
    return null;
  }
  const handleRejectClick = () => {
    if (reason) {
      const id = Number(selectedContractId);
      const formData = new FormData();
      formData.append('reasonOfRejection', reason);
      axios
        .post(`/api/insurance-applications/${id}/rejection`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (response.status === 200) {
            alert('신청이 거절되었습니다.');
            updateApplicationData();
            onClose();
          } else {
            alert('신청 거절에 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('Error fetching group data:', error);
        });
    } else {
      alert('거절 사유를 먼저 입력해주세요.');
    }
  };
  const handleApproveClick = () => {
    const id = Number(selectedContractId);
    if (reason) {
      const formData = new FormData();
      formData.append('reasonOfApproval', reason);
      axios
        .post(`/api/insurance-applications/${id}/approval`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (response.status === 200) {
            alert('신청이 승인되었습니다.');
            updateApplicationData();
            onClose();
          } else {
            alert('신청 승인에 실패했습니다.');
            onClose();
          }
        })
        .catch((error) => {
          console.error('Error fetching group data:', error);
        });
    } else {
      alert('승인 사유를 먼저 입력해주세요.');
    }
  };
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <ModalContent>
          <ModalBody>
            <Title>고객 정보</Title>
            <Description2>
              <SubTitle>고객명</SubTitle>
              <Basic>{applicationData.customerName}</Basic>
            </Description2>
            <Description2>
              <SubTitle>생년월일 · 성별</SubTitle>
              <Basic>
                {applicationData.customerBirth} ·{' '}
                {applicationData.customerGender}
              </Basic>
            </Description2>
            <Description2>
              <SubTitle>직업</SubTitle>
              <Basic>{applicationData.customerJob}</Basic>
            </Description2>
            <Description2>
              <SubTitle>주소</SubTitle>
              <Basic>{applicationData.customerAddress}</Basic>
            </Description2>
            <Description2>
              <SubTitle>전화번호</SubTitle>
              <Basic>{applicationData.customerPhoneNumber}</Basic>
            </Description2>
            <Description>
              <SubTitle>가족력</SubTitle>
              {applicationData.familyHistories.map((familyhistory, index) => (
                <div key={index}>
                  <Basic>
                    {familyhistory.relationship} - {familyhistory.diseaseName}
                  </Basic>
                </div>
              ))}
            </Description>
            <Description2>
              <SubTitle>신청일 · 납입 주기</SubTitle>
              <Basic>
                {applicationData.insuranceApplicationDate} ·{' '}
                {applicationData.paymentCycle}
              </Basic>
            </Description2>
            <Description2>
              <SubTitle>예상 보험료</SubTitle>
              <Basic>{applicationData.premium}</Basic>
            </Description2>
            <Description2>
              <SubTitle>예상 납입기간</SubTitle>
              <Basic>{applicationData.paymentPeriod}</Basic>
            </Description2>
            {!isApprove ? (
              <>
                <SubTitle2>결과 입력</SubTitle2>
                <BorderLine></BorderLine>
                <ActivityContent
                  placeholder={'결정 사유 입력 (최대 200자)'}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <Wrapper>
                  <ClaimButton onClick={handleApproveClick}>승인</ClaimButton>
                  <PayButton onClick={handleRejectClick}>거절</PayButton>
                </Wrapper>
              </>
            ) : null}
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
const ActivityContent = styled.textarea`
  width: 740px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #dbdbdf;
  background: #fafafa;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-top: 12px;
  margin-bottom: 10px;
  padding: 12px 12px;
  resize: none;
  outline: none;
  position: relative;
  &::placeholder {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 0;
    color: rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }
`;
