import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Sidebar2 from '../../component/SideBar2';
import '../../App.css';
import ContractModal from './ContractModal';
import axios from 'axios';
import InsuranceCard from '../../component/Insurance/InsuranceCard';
import { InsuranceProps } from '../../component/Insurance/InsuranceProps';
import { ContractProps } from '../../component/MyContract/ContractProps';
import ContractCard from '../../component/MyContract/ContractCard';

const MyContract = () => {
  const [InsuranceData, setInsuranceData] = useState<InsuranceProps[]>([]);
  const [selectedIsMaturity, setSelectedIsMaturity] = useState(false);
  const [selectedIsCancellation, setSelectedIsCancellation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);
  const dummyContractData: ContractProps[] = [
    {
      id: '1',
      insuranceName: 'Life Insurance',
      insuranceType: 'Term Life',
      insurancePeriod: '10 years',
      premium: 500,
      paymentCycle: 'Monthly',
      maxCompensation: '1,000,000',
      dateOfSubscription: '2023-01-15',
      dateOfMaturity: '2033-01-15',
      maturity: true,
      resurrection: false,
      cancellation: false
    },
    {
      id: '2',
      insuranceName: 'Health Insurance',
      insuranceType: 'Family Health',
      insurancePeriod: '5 years',
      premium: 300,
      paymentCycle: 'Quarterly',
      maxCompensation: '500,000',
      dateOfSubscription: '2022-11-20',
      dateOfMaturity: '2027-11-20',
      maturity: true,
      resurrection: false,
      cancellation: false
    },
    {
      id: '3',
      insuranceName: 'Car Insurance',
      insuranceType: 'Comprehensive',
      insurancePeriod: '1 year',
      premium: 600,
      paymentCycle: 'Yearly',
      maxCompensation: '50,000',
      dateOfSubscription: '2023-02-10',
      dateOfMaturity: '2024-02-10',
      maturity: true,
      resurrection: false,
      cancellation: false
    },
    {
      id: '4',
      insuranceName: 'Home Insurance',
      insuranceType: 'Property Insurance',
      insurancePeriod: '20 years',
      premium: 800,
      paymentCycle: 'Monthly',
      maxCompensation: '1,500,000',
      dateOfSubscription: '2021-07-05',
      dateOfMaturity: '2041-07-05',
      maturity: true,
      resurrection: false,
      cancellation: false
    },
    {
      id: '5',
      insuranceName: 'Travel Insurance',
      insuranceType: 'Single Trip',
      insurancePeriod: '1 month',
      premium: 50,
      paymentCycle: 'One-time',
      maxCompensation: '10,000',
      dateOfSubscription: '2023-03-05',
      dateOfMaturity: '2023-04-05',
      maturity: false,
      resurrection: false,
      cancellation: true
    },
    {
      id: '6',
      insuranceName: 'Pet Insurance',
      insuranceType: 'Pet Health',
      insurancePeriod: '2 years',
      premium: 100,
      paymentCycle: 'Monthly',
      maxCompensation: '5,000',
      dateOfSubscription: '2022-09-12',
      dateOfMaturity: '2024-09-12',
      maturity: true,
      resurrection: false,
      cancellation: false
    },
    {
      id: '7',
      insuranceName: 'Liability Insurance',
      insuranceType: 'General Liability',
      insurancePeriod: '3 years',
      premium: 400,
      paymentCycle: 'Yearly',
      maxCompensation: '1,000,000',
      dateOfSubscription: '2022-04-30',
      dateOfMaturity: '2025-04-30',
      maturity: true,
      resurrection: false,
      cancellation: false
    },
    {
      id: '8',
      insuranceName: 'Business Insurance',
      insuranceType: 'Commercial Property',
      insurancePeriod: '15 years',
      premium: 1200,
      paymentCycle: 'Yearly',
      maxCompensation: '2,000,000',
      dateOfSubscription: '2020-12-15',
      dateOfMaturity: '2035-12-15',
      maturity: true,
      resurrection: false,
      cancellation: false
    },
    {
      id: '9',
      insuranceName: 'Dental Insurance',
      insuranceType: 'Individual Dental',
      insurancePeriod: '1 year',
      premium: 150,
      paymentCycle: 'Monthly',
      maxCompensation: '10,000',
      dateOfSubscription: '2023-05-25',
      dateOfMaturity: '2024-05-25',
      maturity: true,
      resurrection: false,
      cancellation: false
    },
    {
      id: '10',
      insuranceName: 'Accident Insurance',
      insuranceType: 'Personal Accident',
      insurancePeriod: '5 years',
      premium: 200,
      paymentCycle: 'Quarterly',
      maxCompensation: '200,000',
      dateOfSubscription: '2022-08-08',
      dateOfMaturity: '2027-08-08',
      maturity: true,
      resurrection: false,
      cancellation: false
    }
  ];

  useEffect(() => {
    axios
      .get('api/insurance')
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          setInsuranceData(response.data.data);
        } else {
          console.error('Application list data not available:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching application history:', error);
      });
  }, []);

  const openModal = ({ insuranceId }: { insuranceId: any }) => {
    setSelectedInsuranceId(insuranceId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInsuranceId(null);
  };

  const filteredContractData: ContractProps[] = dummyContractData.filter(
    (insurance) => {
      const MaturityMatch =
        !selectedIsMaturity || insurance.maturity === selectedIsMaturity;
      const CancelMatch =
        !selectedIsCancellation ||
        insurance.cancellation === selectedIsCancellation;
      return MaturityMatch && CancelMatch;
    }
  );
  return (
    <Wrapper>
      <Content>
        <Introduction>
          <h2>내가 가입한 보험</h2>
        </Introduction>
        <Sidebar2
          selectedIsMaturity={selectedIsMaturity}
          setSelectedIsMaturity={setSelectedIsMaturity}
          selectedIsCancellation={selectedIsCancellation}
          setSelectedIsCancellation={setSelectedIsCancellation}
        />
        <CardList>
          {filteredContractData.map((contract) => {
            return (
              <CardContainer
                key={contract.id}
                onClick={() => openModal({ insuranceId: contract.id })}>
                <ContractCard {...contract} />
              </CardContainer>
            );
          })}
        </CardList>
        <ContractModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedInsuranceId={selectedInsuranceId}
        />
      </Content>
    </Wrapper>
  );
};

export default MyContract;

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 130px;
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
  }
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 41px;
  margin-left: 50px;
`;

const CardContainer = styled.div`
  width: 360px;
  height: 170px;
  margin-top: 8px;
  margin-right: 45px;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 30px 3px rgba(76, 76, 255, 0.25);
`;
