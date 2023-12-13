import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Layouts/Sidabar/ContractSideBar';
import '../../../App.css';
import ContractModal from './ContractModal';
import { ContractProps } from '../../../component/Props/ContractProps';
import ContractCard from './ContractCard';
import ApplicationCard from './Application/ApplicationCard';
import { ApplicationProps } from '../../../component/Props/ApplicationProps';
import axios from 'axios';

const ContractList = () => {
  const [ContractData, setContractData] = useState<ContractProps[]>([]);
  const [ApplicationData, setApplicationData] = useState<ApplicationProps[]>(
    []
  );
  const [selectedIsMaturity, setSelectedIsMaturity] = useState(false);
  const [selectedIsCancellation, setSelectedIsCancellation] = useState(false);
  const [selectedIsApplication, setSelectedIsApplication] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem('id');
    console.log(id);
    if (selectedIsApplication) {
      axios
        .get(`/api/insurance-applications/${id}/my`)
        .then((response) => {
          console.log(response);
          if (response.data.data) {
            setApplicationData(response.data.data);
          } else {
            console.error(
              'ApplyInsurance list data not available:',
              response.data
            );
          }
        })
        .catch((error) => {
          console.error('Error fetching application history:', error);
        });
    }
  }, [selectedIsApplication]);
  useEffect(() => {
    const id = localStorage.getItem('id');
    axios
      .get(`/api/contracts/${id}`)
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          setContractData(response.data.data);
        } else {
          console.error(
            'ApplyInsurance list data not available:',
            response.data
          );
        }
      })
      .catch((error) => {
        console.error('Error fetching application history:', error);
      });
  }, []);

  const openModal = ({ contractId }: { contractId: any }) => {
    setSelectedContractId(contractId);
    if (!selectedIsApplication) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContractId(null);
  };
  let filteredData: (ContractProps | ApplicationProps)[] = [];

  if (selectedIsApplication) {
    filteredData = ApplicationData;
  } else {
    filteredData = ContractData.filter((insurance) => {
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
            const cardId = selectedIsApplication
              ? (data as ApplicationProps).insuranceApplicationID
              : (data as ContractProps).id;

            return (
              <CardContainer
                key={cardId}
                onClick={() => {
                  if (selectedIsApplication) {
                    openModal({
                      contractId: (data as ApplicationProps)
                        .insuranceApplicationID
                    });
                  } else {
                    openModal({ contractId: (data as ContractProps).id });
                  }
                }}>
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
  width: 1230px;
`;

const CardContainer = styled.div`
  width: 360px;
  height: 180px;
  margin-top: 8px;
  margin-left: 45px;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid #dbdbdf;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
    color: rgba(0, 0, 0, 0.95);
    box-shadow: 0px 4px 30px 3px rgba(76, 76, 255, 0.25);
  }
`;
