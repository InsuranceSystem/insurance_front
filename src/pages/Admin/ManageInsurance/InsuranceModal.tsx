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
  SpecialButton,
  AddButton,
  PayButton,
  DeleteButton
} from '../../../component/ModalStyle/ModalStyle';
import scrollbar from '../../../assets/scrollBar.svg';
import styled from 'styled-components';
import axios from 'axios';
import { InsuranceProps } from '../../../component/Props/InsuranceProps';
import { TermsProps } from '../../../component/Props/TermsProps';
import { useNavigate } from 'react-router-dom';
type RecruitmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedInsuranceId: null;
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
const RecruitmentModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  selectedInsuranceId
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
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [insuranceData, setInsuranceData] = useState<InsuranceProps | null>(
    null
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [termsData, setTermsData] = useState<TermsProps[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axios
      .get(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/insurances/${selectedInsuranceId}`
      )
      .then((response) => {
        if (response.data.data) {
          setInsuranceData(response.data.data);
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  }, [selectedInsuranceId]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axios
      .get(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/insurances/${selectedInsuranceId}/terms`
      )
      .then((response) => {
        if (response.data.data) {
          setTermsData(response.data.data);
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  }, [selectedInsuranceId]);
  if (!isOpen || !insuranceData) {
    return null;
  }
  const handleEditClick = () => {
    console.log(insuranceData.id);
    navigate('/admin/edit', { state: { id: insuranceData.id } });
    //window.location.href = `/edit?state=${insuranceData.id}`;
  };
  const handleOnSaleClick = () => {
    const token = sessionStorage.getItem('accessToken');
    axios
      .post(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/insurances/${selectedInsuranceId}/register`
      )
      .then((response) => {
        if (response.status === 200) {
          alert('등록되었습니다.');
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  };
  const handleStopClick = () => {
    axios
      .delete(
        `https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/insurances/${selectedInsuranceId}`
      )
      .then((response) => {
        if (response.status === 200) {
          alert('삭제되었습니다.');
        } else {
          console.error(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  };
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <ModalContent>
          <ModalBody>
            <Title>{insuranceData.insuranceName}</Title>
            <Description2>
              <SubTitle>최대 보장한도</SubTitle>
              <Basic>
                {Number(insuranceData.maxCompensation).toLocaleString()}
              </Basic>
            </Description2>
            <Description2>
              <SubTitle>보험 기간</SubTitle>
              <Basic>{insuranceData.periodOfInsurance}</Basic>
            </Description2>
            <Description2>
              <SubTitle>배당여부</SubTitle>
              {insuranceData.distributionStatus && <Basic>O</Basic>}
              {!insuranceData.distributionStatus && <Basic>X</Basic>}
            </Description2>
            <Description2>
              <SubTitle>추천 연령</SubTitle>
              <Basic>{insuranceData.ageOfTarget}</Basic>
            </Description2>
            <Description>
              <SubTitle>보장 약관</SubTitle>
              {termsData.map((terms, index) => (
                <div key={terms.termsID}>
                  <Basic>
                    {terms.termsName} - {terms.calculatedMoneyMethod} ·{' '}
                    {terms.termsContent}
                  </Basic>
                </div>
              ))}
            </Description>
            <Description2>
              <SubTitle>주의 사항</SubTitle>
              <Content>{insuranceData.precaution}</Content>
            </Description2>
            {insuranceData.authorization ? (
              <SpecialButton onClick={handleStopClick}>보험 삭제</SpecialButton>
            ) : (
              <Wrapper>
                <AddButton onClick={handleOnSaleClick}>판매 등록</AddButton>
                <PayButton onClick={handleEditClick}>설계서 수정</PayButton>
                <DeleteButton onClick={handleStopClick}>보험 삭제</DeleteButton>
              </Wrapper>
            )}
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default RecruitmentModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
