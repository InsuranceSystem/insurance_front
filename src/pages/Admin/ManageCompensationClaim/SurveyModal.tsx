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
} from '../../../component/ModalStyle/ModalStyle';
import scrollbar from '../../../assets/scrollBar.svg';
import styled from 'styled-components';
import axios from 'axios';
import SelectResponsibility from '../../../component/Selector/SelectResponsibility';
import StyledFileInput from '../../../component/Selector/StyledFileInput';
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
const SurveyModal = ({
  isOpen,
  onClose,
  selectedCompensationId,
  handleForceRefresh
}: RecruitmentModalProps & { handleForceRefresh: () => void }) => {
  const [managerName, setManagerName] = useState('');
  const [surveyFee, setSurveyFee] = useState('');
  const [decisionMoney, setDecisionMoney] = useState('');
  const [responsibility, setResponsibility] = useState(false);
  const [responsibilityReason, setResponsibilityReason] = useState('');
  const [reportFile, setReportFile] = useState<File | null>(null);
  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const handleSubmit = async () => {
    const id = Number(selectedCompensationId);
    const formData = new FormData();
    formData.append('managerName', managerName);
    formData.append('responsibilityReason', responsibilityReason);
    formData.append('responsibility', JSON.stringify(responsibility));
    formData.append('decisionMoney', JSON.stringify(Number(decisionMoney)));
    formData.append('surveyFee', JSON.stringify(Number(surveyFee)));
    formData.append('reportFile', reportFile || '');
    for (const key of formData.keys()) {
      console.log(key, ':', formData.get(key));
    }
    try {
      const response = await axios.post(`/api/survey/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response);

      if (response.status === 200) {
        alert('제출이 완료되었습니다.');
        handleForceRefresh();
        onClose();
      } else {
        alert('제출에 실패했습니다.');
        handleForceRefresh();
        onClose();
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  if (!isOpen) {
    return null;
  }
  const handleResponsibilityChange = (Age: boolean | false) => {
    if (Age !== null) {
      setResponsibility(Age);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setReportFile(event.target.files[0]);
    }
  };
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <ModalContent>
          <ModalBody>
            <Title>손해사정</Title>
            <Description3>
              <SubTitle>담당자명</SubTitle>
              <BasicInput
                id='name'
                type='text'
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder={'예시 - 자동차보험A'}
              />
              <BorderLine></BorderLine>
            </Description3>
            <Description3>
              <SubTitle>손해사정 비용</SubTitle>
              <BasicInput
                id='name'
                type='text'
                value={surveyFee}
                onChange={(e) => setSurveyFee(e.target.value)}
                placeholder={'숫자만 입력하세요'}
              />
              <BorderLine></BorderLine>
            </Description3>
            <Description3>
              <SubTitle>결정 보험금</SubTitle>
              <BasicInput
                id='name'
                type='text'
                value={decisionMoney}
                onChange={(e) => setDecisionMoney(e.target.value)}
                placeholder={'숫자만 입력하세요'}
              />
              <BorderLine></BorderLine>
            </Description3>
            <Description3>
              <SubTitle>조사 보고서</SubTitle>
              <StyledFileInput onChange={handleFileChange} />
              <BorderLine></BorderLine>
            </Description3>
            <Description3>
              <SubTitle>고객 책임 여부</SubTitle>
              <SelectResponsibility
                value={responsibility}
                onChange={handleResponsibilityChange}></SelectResponsibility>
            </Description3>
            {responsibility ? (
              <Description>
                <SubTitle>고객 책임 사유</SubTitle>
                <BorderLine></BorderLine>
                <ActivityContent
                  placeholder={'면/부책 사유 입력 (최대 200자)'}
                  value={responsibilityReason}
                  onChange={(e) => setResponsibilityReason(e.target.value)}
                />
              </Description>
            ) : null}
            <Wrapper>
              <SupportButton onClick={handleSubmit}>제출하기</SupportButton>
            </Wrapper>
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default SurveyModal;

const Wrapper = styled.div`
  display: flex;
`;
const Description3 = styled.div`
  width: 772px;
  height: 118px;
  border-radius: 10px;
  margin-left: 30px;
  background: #fff;
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.05);
  margin-top: 40px;
`;
const ActivityContent = styled.textarea`
  width: 680px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #dbdbdf;
  background: #fafafa;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 30px;
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
const BasicInput = styled.input`
  width: 600px;
  height: 16px;
  padding: 0px;
  flex-shrink: 0;
  border: none;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-bottom: 0px;
  margin-top: 23px;
  outline: none;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;
const BorderLine = styled.hr`
  stroke-width: 2px;
  width: 700px;
  flex-shrink: 0;
  margin-left: 30px;
  margin-right: 8px;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 10px;
`;
