import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import InsuranceSideBar from '../../../Layouts/Sidabar/InsuranceSideBar';
import '../../../App.css';
import plus_icon from '../../../assets/plus-icon.svg';
import InsuranceModal from './InsuranceModal';
import axios from 'axios';
import InsuranceCard from './InsuranceCard';
import { InsuranceProps } from '../../../component/Props/InsuranceProps';
import InsuranceManageSideBar from '../../../Layouts/Sidabar/InsuranceManageSideBar';
import { Link, useNavigate } from 'react-router-dom';

const ManageInsurance = () => {
  const navigate = useNavigate();
  const [InsuranceData, setInsuranceData] = useState<InsuranceProps[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedIsOnSale, setSelectedIsOnSale] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);
  const [forceRefresh, setForceRefresh] = useState(false);
  useEffect(() => {
    axios
      .get(
        'https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/insurances/all'
      )
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          setInsuranceData(response.data.data);
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
  }, [forceRefresh]);

  const openModal = ({ insuranceId }: { insuranceId: any }) => {
    setSelectedInsuranceId(insuranceId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInsuranceId(null);
    setForceRefresh((prev) => !prev);
  };
  const handleCreateInsurance = () => {
    navigate('/admin/DesignInsurance');
  };
  const filteredInsuranceData: InsuranceProps[] = InsuranceData.filter(
    (insurance) => {
      const typeMatch = !selectedType || insurance.type === selectedType;
      const authorizationMatch = selectedIsOnSale
        ? insurance.authorization
        : !insurance.authorization;
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
        <InsuranceManageSideBar
          setSelectedIsOnSale={setSelectedIsOnSale}
          selectedIsOnSale={selectedIsOnSale}
        />
        <CardList>
          <CreateOrganization>
            <div onClick={handleCreateInsurance}>
              <img src={plus_icon} className='plus_Icon' alt='plus' />
              <div>새 보험 등록하기</div>
            </div>
          </CreateOrganization>
          {filteredInsuranceData.map((insurance) => {
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

export default ManageInsurance;
const CreateOrganization = styled.div`
  width: 360px;
  height: 160px;
  margin-top: 8px;
  margin-left: 45px;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid #dbdbdf;
  text-decoration: none;
  box-shadow: 0px 4px 30px 3px rgba(42, 114, 255, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    margin-bottom: 10px;
    margin-top: 30px;
  }
  div {
    color: rgba(0, 0, 0, 0.8);
    leading-trim: both;
    text-edge: cap;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-family: 'GmarketSansMedium';
    margin-bottom: 5px;
  }
  a {
    text-decoration: none;
    color: inherit; /* Inherit color from parent */
  }
`;
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
  margin-top: 21px;
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
