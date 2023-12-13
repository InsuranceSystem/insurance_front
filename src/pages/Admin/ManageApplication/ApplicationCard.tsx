import React, { useState } from 'react';
import {
  CardContainer,
  CardInfo,
  Details,
  FileButton,
  ResultButton,
  Wrapper,
  UpWrapper,
  Name
} from '../../../component/CardStyle/CardStyles';
import { ApplicationProps } from '../../../component/Props/ApplicationProps';
import styled from 'styled-components';
import CustomerInfoModal from './CustomerInfoModal';
import ResultModal from './ResultModal';
import axios from 'axios';

const ApplicationCard = ({
  insuranceApplicationID,
  insuranceName,
  createdAt,
  insurancePeriod,
  premium,
  paymentCycle,
  maxCompensation,
  subscriptionFilePath,
  customerName,
  approval,
  state,
  reasonOfApproval,
  updateApplicationData // 새로운 prop으로 추가
}: ApplicationProps & { updateApplicationData: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const handleFileClick = async () => {
    try {
      const response = await axios.get(
        `/api/insurance-applications/${insuranceApplicationID}/subscription`,
        {
          responseType: 'arraybuffer' // responseType을 arraybuffer로 변경
        }
      );

      const fileBlob = new Blob([response.data], { type: 'application/pdf' }); // PDF MIME 타입으로 설정

      const shouldOpenInNewWindow = window.confirm('파일을 새 창에서 열까요?');
      if (shouldOpenInNewWindow) {
        const blobUrl = URL.createObjectURL(fileBlob);
        const myFile = blobToFile(fileBlob, 'my-image.pdf');
        const fileUrl = URL.createObjectURL(myFile);
        window.open(fileUrl, '_blank');
        //window.open(myFile, '청약서 조회');
      } else {
        // Create an anchor element and set download attribute to force download
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(fileBlob);
        downloadLink.download = 'file.pdf';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } catch (error) {
      // Handle errors, e.g., network errors or server errors
      console.error('Error fetching file:', error);
    }
  };
  const blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return theBlob as File;
  };
  const openInfoModal = () => {
    setIsModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsModalOpen(false);
  };
  const openResultModal = () => {
    setIsResultModalOpen(true);
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);
  };
  return (
    <CardContainer>
      <UpWrapper>
        <CardInfo>
          <Wrapper>
            <Name>{insuranceName}</Name>
            <Status approval={state !== 'PROCESSING'}>
              {state !== 'PROCESSING' ? '심사 완료' : '심사 중'}
            </Status>
          </Wrapper>
          <p>
            {createdAt} 신청 · 고객명 {customerName}
          </p>
        </CardInfo>
      </UpWrapper>
      <FileButton onClick={handleFileClick}>청약서 조회</FileButton>
      {state === 'PROCESSING' ? (
        <Button onClick={() => openInfoModal()}>고객조회/결과입력</Button>
      ) : (
        <FileButton onClick={() => openInfoModal()}>정보 조회</FileButton>
      )}
      {state !== 'PROCESSING' ? (
        <FileButton onClick={() => openResultModal()}>결과 확인</FileButton>
      ) : null}
      <CustomerInfoModal
        isOpen={isModalOpen}
        isApprove={state !== 'PROCESSING'}
        onClose={closeInfoModal}
        selectedContractId={insuranceApplicationID}
        updateApplicationData={updateApplicationData}
      />
      <ResultModal
        isOpen={isResultModalOpen}
        onClose={closeResultModal}
        selectedContractId={insuranceApplicationID}
      />
    </CardContainer>
  );
};

export default ApplicationCard;

const Status = styled.span<{ approval: boolean }>`
  height: 27px;
  flex-shrink: 0;
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 10px;
  background: ${({ approval }) =>
    approval ? 'rgba(255, 122, 122, 0.1)' : 'rgba(161, 161, 161, 0.10)'};
  color: ${({ approval }) => (approval ? '#ff4141' : '#87888B')};
  leading-trim: both;
  text-edge: cap;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 29.5px;
  align-items: center;
  text-align: center;
  margin-top: 15px;
  font-family: 'GmarketSansMedium';
  margin-left: auto;
`;
const Button = styled.button`
  font-family: 'GmarketSansMedium';
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  width: 144px;
  height: 40px;
  line-height: 41px;
  border-radius: 15px;
  background: rgba(0, 47, 213, 0.05);
  color: #002fd5;
  border: none;
  margin-top: 13px;
  margin-left: 10px;

  &:hover {
    background-color: #002fd5;
    color: #ffffff;
  }

  &:active {
    color: #002fd5;
  }
`;
