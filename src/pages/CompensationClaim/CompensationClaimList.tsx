import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import '../../App.css';
import ContractModal from './CompensationClaimModal';
import CompensationClaimCard from './CompensationClaimCard';
import { CompensationClaimProps } from '../../component/Props/CompensationClaimProps';
import Sidebar from '../../Layouts/CompensationSidebar';
import { InsuranceProps } from '../../component/Props/InsuranceProps';

const ContractList = () => {
  const [CompensationClaimData, setCompensationClaimData] = useState<
    CompensationClaimProps[]
  >([]);
  const [selectedIsProceeding, setSelectedIsProceeding] = useState(false);
  const [selectedIsCompleted, setSelectedIsCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompensationId, setSelectedCompensationId] = useState(null);
  const dummyCompensationClaimData: CompensationClaimProps[] = [
    {
      id: '1',
      insuranceName: '건강보험A',
      insuranceType: 'Term Life',
      receptionistName: 'John Doe',
      receptionistPNumber: '123-456-7890',
      relationshipOfContractor: 'Spouse',
      documentFilePath: '/documents/file1.pdf',
      bank: 'ABC Bank',
      accountNumber: '1234567890',
      accountHolderName: 'John Doe',
      isAlreadySurvey: true
    },
    {
      id: '2',
      insuranceName: '건강보험B',
      insuranceType: 'Family Health',
      receptionistName: 'Alice Smith',
      receptionistPNumber: '987-654-3210',
      relationshipOfContractor: 'Child',
      documentFilePath: '/documents/file2.pdf',
      bank: 'XYZ Bank',
      accountNumber: '0987654321',
      accountHolderName: 'Alice Smith',
      isAlreadySurvey: false
    },
    {
      id: '3',
      insuranceName: '자동차보험A',
      insuranceType: 'Comprehensive',
      receptionistName: 'Robert Johnson',
      receptionistPNumber: '111-222-3333',
      relationshipOfContractor: 'Friend',
      documentFilePath: '/documents/file3.pdf',
      bank: 'DEF Bank',
      accountNumber: '111122223333',
      accountHolderName: 'Robert Johnson',
      isAlreadySurvey: true
    },
    {
      id: '4',
      insuranceName: '자동차보험C',
      insuranceType: 'Property Insurance',
      receptionistName: 'Emily Brown',
      receptionistPNumber: '444-555-6666',
      relationshipOfContractor: 'Parent',
      documentFilePath: '/documents/file4.pdf',
      bank: 'GHI Bank',
      accountNumber: '444455556666',
      accountHolderName: 'Emily Brown',
      isAlreadySurvey: false
    },
    {
      id: '5',
      insuranceName: '여행자보험A',
      insuranceType: 'Single Trip',
      receptionistName: 'Michael Wilson',
      receptionistPNumber: '777-888-9999',
      relationshipOfContractor: 'Sibling',
      documentFilePath: '/documents/file5.pdf',
      bank: 'JKL Bank',
      accountNumber: '777788899999',
      accountHolderName: 'Michael Wilson',
      isAlreadySurvey: true
    },
    {
      id: '6',
      insuranceName: '반려동물 보험A',
      insuranceType: 'Pet Health',
      receptionistName: 'Sophia Miller',
      receptionistPNumber: '333-111-0000',
      relationshipOfContractor: 'Child',
      documentFilePath: '/documents/file6.pdf',
      bank: 'MNO Bank',
      accountNumber: '3331110000',
      accountHolderName: 'Sophia Miller',
      isAlreadySurvey: false
    },
    {
      id: '7',
      insuranceName: '운전자보험C',
      insuranceType: 'General Liability',
      receptionistName: 'William Anderson',
      receptionistPNumber: '999-000-1111',
      relationshipOfContractor: 'Friend',
      documentFilePath: '/documents/file7.pdf',
      bank: 'PQR Bank',
      accountNumber: '9990001111',
      accountHolderName: 'William Anderson',
      isAlreadySurvey: true
    }
  ];

  // useEffect(() => {
  //   axios
  //     .get('api/insurance')
  //     .then((response) => {
  //       console.log(response);
  //       if (response.data.data) {
  //         setCompensationClaimData(response.data.data);
  //       } else {
  //         console.error('Apply list data not available:', response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching application history:', error);
  //     });
  // }, []);

  const openModal = ({ compensationId }: { compensationId: any }) => {
    setSelectedCompensationId(compensationId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompensationId(null);
  };
  const filteredCompensationData: CompensationClaimProps[] =
    dummyCompensationClaimData.filter((compensation) => {
      if (selectedIsProceeding && !selectedIsCompleted) {
        return !compensation.isAlreadySurvey;
      } else if (!selectedIsProceeding && selectedIsCompleted) {
        return compensation.isAlreadySurvey;
      }
      return true;
    });
  return (
    <Wrapper>
      <Content>
        <Introduction>
          <h2>내가 청구한 보상</h2>
        </Introduction>
        <Sidebar
          selectedIsProceeding={selectedIsProceeding}
          setSelectedIsProceeding={setSelectedIsProceeding}
          selectedIsCompleted={selectedIsCompleted}
          setSelectedIsCompleted={setSelectedIsCompleted}
        />
        <CardList>
          {filteredCompensationData.map((compensation) => {
            return (
              <CardContainer
                key={compensation.id}
                onClick={() => openModal({ compensationId: compensation.id })}>
                <CompensationClaimCard {...compensation} />
              </CardContainer>
            );
          })}
        </CardList>
        <ContractModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedCompensationId={selectedCompensationId}
        />
      </Content>
    </Wrapper>
  );
};

export default ContractList;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Introduction = styled.div`
  margin-left: 50px;
  h2 {
    margin-top: 70px;
    color: rgba(0, 0, 0, 1);
    leading-trim: both;
    text-edge: cap;
    font-family: 'GmarketSansMedium';
    font-size: 23px;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    margin-bottom: 18px;
    margin-right: 1000px;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 41px;
  width: 1220px;
`;

const CardContainer = styled.div`
  width: 360px;
  height: 190px;
  margin-top: 8px;
  margin-left: 45px;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 30px 3px rgba(76, 76, 255, 0.25);
`;
