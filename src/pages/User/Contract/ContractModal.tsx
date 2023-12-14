import React, { useEffect, useState } from 'react';
import {
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  Title,
  SubTitle,
  Basic,
  Description2,
  PayButton,
  AddButton,
  SpecialButton
} from '../../../component/ModalStyle/ModalStyle';
import scrollbar from '../../../assets/scrollBar.svg';
import styled from 'styled-components';
import axios from 'axios';
import { ContractProps } from '../../../component/Props/ContractProps';
import { useNavigate } from 'react-router-dom';
type RecruitmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedContractId: null;
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
const ContractModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  selectedContractId
}) => {
  const navigate = useNavigate();
  const [ContractData, setContractData] = useState<ContractProps | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      axios
        .get(`/api/contracts/${selectedContractId}/detail`)
        .then((response) => {
          if (response.data.data) {
            setContractData(response.data.data);
          } else {
            console.error(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching group data:', error);
        });
    }
  }, [isOpen, selectedContractId]);
  if (!isOpen || !ContractData) {
    return null;
  }
  const handlePayClick = () => {
    navigate('/user/Pay', { state: { id: ContractData.id } });
  };
  const handleClick = () => {
    alert('해지 환급금 지급이 요청되었습니다. 입금까지 최대 7일이 소요됩니다.');
  };
  const handleClaimClick = () => {
    if (ContractData.insuranceType === '자동차') {
      navigate('/user/CarAccidentClaim', { state: { id: ContractData.id } });
    } else {
      navigate('/user/Claim', { state: { id: ContractData.id } });
    }
  };
  const handleCancelClick = (type: string) => () => {
    navigate('/user/Cancel', { state: { id: ContractData.id, type: type } });
  };
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <ModalContent>
          <ModalBody>
            <Title>{ContractData.insuranceName}</Title>
            <Description2>
              <SubTitle>최대 보장한도</SubTitle>
              <Basic>{ContractData.maxCompensation}</Basic>
            </Description2>
            <Description2>
              <SubTitle>납입 기간</SubTitle>
              <Basic>{ContractData.paymentPeriod}</Basic>
            </Description2>
            <Description2>
              <SubTitle>납입 주기</SubTitle>
              <Basic>{ContractData.paymentCycle}</Basic>
            </Description2>
            <Description2>
              <SubTitle>보험 기간</SubTitle>
              <Basic>{ContractData.insurancePeriod}</Basic>
            </Description2>
            <Description2>
              <SubTitle>보험료</SubTitle>
              <Basic>{ContractData.premium}</Basic>
            </Description2>
            <Description2>
              <SubTitle>가입일 · 만기일</SubTitle>
              <Basic>
                {ContractData.dateOfSubscription} ·{' '}
                {ContractData.dateOfMaturity}
              </Basic>
            </Description2>
            {!ContractData.cancellation ? (
              <>
                {!ContractData.maturity ? (
                  <>
                    <Wrapper>
                      <AddButton onClick={handleClaimClick}>
                        보상금 청구
                      </AddButton>
                      <PayButton onClick={handlePayClick}>
                        보험료 납부
                      </PayButton>
                      <PayButton onClick={handleCancelClick('중도')}>
                        중도 해지
                      </PayButton>
                    </Wrapper>
                  </>
                ) : (
                  <>
                    <SpecialButton onClick={handleCancelClick('만기')}>
                      만기 해지
                    </SpecialButton>
                  </>
                )}
              </>
            ) : null}
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default ContractModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
