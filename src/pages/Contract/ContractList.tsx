import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../Layouts/ContractSideBar';
import '../../App.css';
import ContractModal from './ContractModal';
import { ContractProps } from '../../component/Props/ContractProps';
import ContractCard from './ContractCard';
import ApplicationCard from './ApplicationCard';
import { ApplicationProps } from '../../component/Props/ApplicationProps';

const ContractList = () => {
  const [InsuranceData, setInsuranceData] = useState<ContractProps[]>([]);
  const [selectedIsMaturity, setSelectedIsMaturity] = useState(false);
  const [selectedIsCancellation, setSelectedIsCancellation] = useState(false);
  const [selectedIsApplication, setSelectedIsApplication] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState(null);
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
  // useEffect(() => {
  //   if (selectedIsApplication) {
  //     axios
  //       .get('api/insurance')
  //       .then((response) => {
  //         console.log(response);
  //         if (response.data.data) {
  //           setInsuranceData(response.data.data);
  //         } else {
  //           console.error(
  //             'Apply list data not available:',
  //             response.data
  //           );
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching application history:', error);
  //       });
  //   }
  // }, [selectedIsApplication]);
  // useEffect(() => {
  //   axios
  //     .get('api/insurance')
  //     .then((response) => {
  //       console.log(response);
  //       if (response.data.data) {
  //         setInsuranceData(response.data.data);
  //       } else {
  //         console.error('Apply list data not available:', response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching application history:', error);
  //     });
  // }, []);

  const openModal = ({ contractId }: { contractId: any }) => {
    setSelectedContractId(contractId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContractId(null);
  };
  const dummyApplicationData: ApplicationProps[] = [
    {
      id: '6',
      insuranceName: '건강보험A',
      createdAt: '2022-09-12',
      insurancePeriod: '2 years',
      premium: '100',
      paymentCycle: 'Monthly',
      maxCompensation: '5,000',
      subscriptionFilePath: '/path/to/file6',
      approval: true,
      reasonOfApproval: 'Approved for pet health coverage'
    },
    {
      id: '7',
      insuranceName: '자동차보험B',
      createdAt: '2022-04-30',
      insurancePeriod: '3 years',
      premium: '400',
      paymentCycle: 'Yearly',
      maxCompensation: '1,000,000',
      subscriptionFilePath: '/path/to/file7',
      approval: true,
      reasonOfApproval: 'Approved with certain terms'
    },
    {
      id: '8',
      insuranceName: '운전자보험A',
      createdAt: '2020-12-15',
      insurancePeriod: '15 years',
      premium: '1200',
      paymentCycle: 'Yearly',
      maxCompensation: '2,000,000',
      subscriptionFilePath: '/path/to/file8',
      approval: true,
      reasonOfApproval: 'Approved for commercial property coverage'
    },
    {
      id: '9',
      insuranceName: '여행보험A',
      createdAt: '2023-05-25',
      insurancePeriod: '1 year',
      premium: '150',
      paymentCycle: 'Monthly',
      maxCompensation: '10,000',
      subscriptionFilePath: '/path/to/file9',
      approval: false,
      reasonOfApproval: 'Not approved due to missing documentation'
    },
    {
      id: '10',
      insuranceName: '생명보험B',
      createdAt: '2022-08-08',
      insurancePeriod: '5 years',
      premium: '200',
      paymentCycle: 'Quarterly',
      maxCompensation: '200,000',
      subscriptionFilePath: '/path/to/file10',
      approval: false,
      reasonOfApproval: 'Not approved due to insufficient information'
    }
  ];
  // const filteredContractData: ContractProps[] = dummyContractData.filter(
  //   (insurance) => {
  //     const MaturityMatch =
  //       !selectedIsMaturity || insurance.maturity === selectedIsMaturity;
  //     const CancelMatch =
  //       !selectedIsCancellation ||
  //       insurance.cancellation === selectedIsCancellation;
  //     return MaturityMatch && CancelMatch;
  //   }
  // );
  let filteredData: (ContractProps | ApplicationProps)[] = [];

  if (selectedIsApplication) {
    filteredData = dummyApplicationData;
  } else {
    filteredData = dummyContractData.filter((insurance) => {
      const MaturityMatch =
        !selectedIsMaturity || insurance.maturity === selectedIsMaturity;
      const CancelMatch =
        !selectedIsCancellation ||
        insurance.cancellation === selectedIsCancellation;
      return MaturityMatch && CancelMatch;
    });
  }
  return (
    <Wrapper>
      <Content>
        <Introduction>
          <h2>나의 계약 조회</h2>
        </Introduction>
        <Sidebar
          selectedIsMaturity={selectedIsMaturity}
          setSelectedIsMaturity={setSelectedIsMaturity}
          selectedIsCancellation={selectedIsCancellation}
          setSelectedIsCancellation={setSelectedIsCancellation}
          selectedIsApplication={selectedIsApplication}
          setSelectedIsApplication={setSelectedIsApplication}
        />
        <CardList>
          {filteredData.map((data) => {
            return (
              <CardContainer
                key={data.id}
                onClick={() => openModal({ contractId: data.id })}>
                {selectedIsApplication ? (
                  <ApplicationCard {...(data as ApplicationProps)} />
                ) : (
                  <ContractCard {...(data as ContractProps)} />
                )}
              </CardContainer>
            );
          })}
        </CardList>
        <ContractModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedContractId={selectedContractId}
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
    margin-right: 1030px;
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
