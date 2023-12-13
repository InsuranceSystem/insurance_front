import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import InsuranceSideBar from '../../../Layouts/Sidabar/InsuranceSideBar';
import '../../../App.css';
import InsuranceModal from './InsuranceModal';
import axios from 'axios';
import InsuranceCard from './InsuranceCard';
import { InsuranceProps } from '../../../component/Props/InsuranceProps';

const InsuranceList = () => {
  const [InsuranceData, setInsuranceData] = useState<InsuranceProps[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);
  useEffect(() => {
    axios
      .get('/api/insurances/all')
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          setInsuranceData(response.data.data);
        } else {
          console.error('data not available:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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

  const filteredClubData: InsuranceProps[] = InsuranceData.filter(
    (insurance) => {
      const typeMatch = !selectedType || insurance.type === selectedType;
      const authorizationMatch = insurance.authorization === true;
      return typeMatch && authorizationMatch;
    }
  );
  return (
    <Wrapper>
      <Content>
        <Introduction>
          <h2>카테고리별 상품 조회</h2>
        </Introduction>
        <InsuranceSideBar
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <CardList>
          {filteredClubData.map((insurance) => {
            return (
              <CardContainer
                key={insurance.id}
                onClick={() => openModal({ insuranceId: insurance.id })}>
                <InsuranceCard {...insurance} />
              </CardContainer>
            );
          })}
        </CardList>
        <InsuranceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedInsuranceId={selectedInsuranceId}
        />
      </Content>
    </Wrapper>
  );
};

export default InsuranceList;

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
    margin-right: 950px;
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
  height: 160px;
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
