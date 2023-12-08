import React, { useState } from 'react';
import {
  CardContainer,
  CardInfo,
  Details,
  FileButton,
  Wrapper,
  UpWrapper,
  Name,
  commonButtonStyles
} from '../../../component/CardStyle/CardStyles';
import { CompensationClaimProps } from '../../../component/Props/CompensationClaimProps';
import styled from 'styled-components';
import ResultModal from './ResultModal';
import SurveyModal from './SurveyModal';
import axios from 'axios';
import DetailModal from './DetailModal';

const CompensationClaimCard = ({
  id,
  insuranceName,
  insuranceType,
  receptionistName,
  relationshipOfContractor,
  surveyed,
  handleForceRefresh
}: CompensationClaimProps & { handleForceRefresh: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailOpen, setIsDetailModalOpen] = useState(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const handleFileClick = async () => {
    const numId = Number(id);
    try {
      const response = await axios.get(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/compensation-claim/${numId}/document`,
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openSurveyModal = () => {
    setIsSurveyModalOpen(true);
  };

  const closeSurveyModal = () => {
    setIsSurveyModalOpen(false);
  };
  const openDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };
  return (
    <CardContainer>
      <UpWrapper>
        <CardInfo>
          <Wrapper>
            <Name>{insuranceName}</Name>
            {surveyed ? (
              <Status isAlreadySurvey={surveyed}>처리 완료</Status>
            ) : (
              <Status isAlreadySurvey={surveyed}>처리 중</Status>
            )}
          </Wrapper>
          <p>
            {receptionistName}({relationshipOfContractor}) · {insuranceType}{' '}
            보험
          </p>
        </CardInfo>
      </UpWrapper>
      <FileButton onClick={handleFileClick}>제출 서류</FileButton>
      <FileButton onClick={() => openDetailModal()}>상세 조회</FileButton>
      {surveyed ? (
        <FileButton onClick={() => openModal()}>결과 확인</FileButton>
      ) : (
        <FileButton onClick={() => openSurveyModal()}>손해 사정</FileButton>
      )}
      <ResultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedCompensationId={id}
      />
      <SurveyModal
        isOpen={isSurveyModalOpen}
        onClose={closeSurveyModal}
        selectedCompensationId={id}
        handleForceRefresh={handleForceRefresh}
      />
      <DetailModal
        isOpen={isModalDetailOpen}
        onClose={closeDetailModal}
        selectedCompensationId={id}
      />
    </CardContainer>
  );
};

export default CompensationClaimCard;

const Status = styled.span<{ isAlreadySurvey: boolean }>`
  height: 27px;
  flex-shrink: 0;
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 10px;
  background: ${({ isAlreadySurvey }) =>
    isAlreadySurvey ? 'rgba(255, 122, 122, 0.1)' : 'rgba(161, 161, 161, 0.10)'};
  color: ${({ isAlreadySurvey }) => (isAlreadySurvey ? '#ff4141' : '#87888B')};
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
const ResultButton = styled.button<{ approval: boolean }>`
  ${commonButtonStyles}
  background: ${({ approval }) =>
    approval ? 'rgba(0, 47, 213, 0.05)' : '#f1f3f5'};
  color: ${({ approval }) => (approval ? '#002fd5' : '#87888B')};
  cursor: ${({ approval }) => (approval ? 'pointer' : 'not-allowed')};
  &:hover {
    background-color: ${({ approval }) => (approval ? '#002fd5' : '#f1f3f5')};
    color: ${({ approval }) => (approval ? '#ffffff' : '#87888B')};
  }
`;
