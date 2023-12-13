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
import { CompensationClaimProps } from '../../../component/Props/CompensationClaimProps';
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
const DetailModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  selectedCompensationId
}) => {
  const [CompensationClaim, setCompensationClaim] =
    useState<CompensationClaimProps | null>(null);
  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    axios
      .get(`/api/car-accident/detail/${selectedCompensationId}`)
      .then((response) => {
        if (response.data.data) {
          setCompensationClaim(response.data.data);
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
    if (CompensationClaim?.insuranceType === '자동차') {
      axios
        .get(`/api/car-accident/detail/${selectedCompensationId}`)
        .then((response) => {
          if (response.data.data) {
            setCompensationClaim(response.data.data);
          } else {
            console.error(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching group data:', error);
        });
    } else {
      axios
        .get(`/api/compensation-claim/detail/${selectedCompensationId}`)
        .then((response) => {
          console.log(response);
          if (response.data.data) {
            setCompensationClaim(response.data.data);
          } else {
            console.error(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching group data:', error);
        });
    }
  }, [selectedCompensationId]);
  if (!isOpen || !CompensationClaim) {
    return null;
  }
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <ModalContent>
          <ModalBody>
            <Title>청구내역 상세조회</Title>
            <Description2>
              <SubTitle>신청자 이름</SubTitle>
              <Basic>{CompensationClaim.receptionistName}</Basic>
            </Description2>
            <Description2>
              <SubTitle>전화번호</SubTitle>
              <Basic>{CompensationClaim.receptionistPNumber}</Basic>
            </Description2>
            <Description2>
              <SubTitle>관계</SubTitle>
              <Basic>{CompensationClaim.relationshipOfContractor}</Basic>
            </Description2>
            <Description2>
              <SubTitle>은행명 - 계좌번호/예금주명</SubTitle>
              <Basic>
                {CompensationClaim.bank} - {CompensationClaim.accountNumber} /{' '}
                {CompensationClaim.accountHolderName}
              </Basic>
            </Description2>
            {CompensationClaim.insuranceType === '자동차' ? (
              <>
                <Description2>
                  <SubTitle>사고유형</SubTitle>
                  <Basic>{CompensationClaim.type}</Basic>
                </Description2>
                <Description2>
                  <SubTitle>사고 일시</SubTitle>
                  <Basic>{CompensationClaim.dateTime}</Basic>
                </Description2>
                <Description2>
                  <SubTitle>사고 장소</SubTitle>
                  <Basic>{CompensationClaim.place}</Basic>
                </Description2>
                <Description2>
                  <SubTitle>차량 번호</SubTitle>
                  <Basic>{CompensationClaim.carNumber}</Basic>
                </Description2>
                <Description2>
                  <SubTitle>운전자 이름</SubTitle>
                  <Basic>{CompensationClaim.driverName}</Basic>
                </Description2>
                <Description2>
                  <SubTitle>면허번호</SubTitle>
                  <Basic>{CompensationClaim.licenseNumber}</Basic>
                </Description2>
                <Description2>
                  <SubTitle>사고 상세</SubTitle>
                  <Basic>{CompensationClaim.accidentDetail}</Basic>
                </Description2>
              </>
            ) : null}
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default DetailModal;

const Wrapper = styled.div`
  display: flex;
`;
