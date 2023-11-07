import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/SideBar';
import '../../App.css';
import InsuranceModal from './InsuranceModal';
import axios from 'axios';
import InsuranceCard from '../../component/Insurance/InsuranceCard';
import { InsuranceProps } from '../../component/Insurance/InsuranceProps';

const InsuranceList = () => {
  const [InsuranceData, setInsuranceData] = useState<InsuranceProps[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);
  // 더미 데이터 생성
  const dummyInsuranceData: InsuranceProps[] = [
    {
      id: '1',
      insuranceName: '보험상품 1',
      type: '자동차',
      maxCompensation: 10000,
      periodOfInsurance: '1년',
      paymentCycle: '매월',
      paymentPeriod: '10년',
      ageOfTarget: '30-50세',
      basicPremium: 500,
      rate: '5%',
      distributionStatus: true,
      authorization: true,
      TermsIDList: '1,2,3',
      insuranceClausePeriod: '10년',
      precaution: '주의사항 1'
    },
    {
      id: '2',
      insuranceName: '보험상품 2',
      type: '운전자',
      maxCompensation: 15000,
      periodOfInsurance: '2년',
      paymentCycle: '매월',
      paymentPeriod: '15년',
      ageOfTarget: '25-60세',
      basicPremium: 600,
      rate: '6%',
      distributionStatus: false,
      authorization: true,
      TermsIDList: '2,3,4',
      insuranceClausePeriod: '12년',
      precaution: '주의사항 2'
    },
    {
      id: '3',
      insuranceName: '보험상품 3',
      type: '실손',
      maxCompensation: 12000,
      periodOfInsurance: '3년',
      paymentCycle: '분기별',
      paymentPeriod: '12년',
      ageOfTarget: '35-55세',
      basicPremium: 550,
      rate: '4%',
      distributionStatus: true,
      authorization: true,
      TermsIDList: '1,3,5',
      insuranceClausePeriod: '15년',
      precaution: '주의사항 3'
    },
    {
      id: '4',
      insuranceName: '보험상품 4',
      type: '자녀',
      maxCompensation: 20000,
      periodOfInsurance: '4년',
      paymentCycle: '매월',
      paymentPeriod: '20년',
      ageOfTarget: '20-60세',
      basicPremium: 700,
      rate: '7%',
      distributionStatus: false,
      authorization: true,
      TermsIDList: '2,4,6',
      insuranceClausePeriod: '8년',
      precaution: '주의사항 4'
    },
    {
      id: '5',
      insuranceName: '보험상품 5',
      type: '건강',
      maxCompensation: 8000,
      periodOfInsurance: '1년',
      paymentCycle: '매월',
      paymentPeriod: '10년',
      ageOfTarget: '30-50세',
      basicPremium: 450,
      rate: '4.5%',
      distributionStatus: true,
      authorization: true,
      TermsIDList: '1,3,7',
      insuranceClausePeriod: '14년',
      precaution: '주의사항 5'
    },
    {
      id: '6',
      insuranceName: '보험상품 6',
      type: '유병자',
      maxCompensation: 17000,
      periodOfInsurance: '2년',
      paymentCycle: '분기별',
      paymentPeriod: '15년',
      ageOfTarget: '25-60세',
      basicPremium: 650,
      rate: '6.5%',
      distributionStatus: false,
      authorization: true,
      TermsIDList: '2,4,8',
      insuranceClausePeriod: '11년',
      precaution: '주의사항 6'
    },
    {
      id: '7',
      insuranceName: '보험상품 7',
      type: '치아',
      maxCompensation: 14000,
      periodOfInsurance: '3년',
      paymentCycle: '매월',
      paymentPeriod: '12년',
      ageOfTarget: '35-55세',
      basicPremium: 600,
      rate: '6%',
      distributionStatus: true,
      authorization: true,
      TermsIDList: '1,3,9',
      insuranceClausePeriod: '13년',
      precaution: '주의사항 7'
    },
    {
      id: '8',
      insuranceName: '보험상품 8',
      type: '화재',
      maxCompensation: 18000,
      periodOfInsurance: '4년',
      paymentCycle: '분기별',
      paymentPeriod: '20년',
      ageOfTarget: '20-60세',
      basicPremium: 750,
      rate: '7.5%',
      distributionStatus: false,
      authorization: true,
      TermsIDList: '2,5,10',
      insuranceClausePeriod: '10년',
      precaution: '주의사항 8'
    },
    {
      id: '9',
      insuranceName: '보험상품 9',
      type: '재산',
      maxCompensation: 16000,
      periodOfInsurance: '5년',
      paymentCycle: '매월',
      paymentPeriod: '10년',
      ageOfTarget: '30-50세',
      basicPremium: 550,
      rate: '5.5%',
      distributionStatus: true,
      authorization: true,
      TermsIDList: '1,6,11',
      insuranceClausePeriod: '12년',
      precaution: '주의사항 9'
    },
    {
      id: '10',
      insuranceName: '보험상품 10',
      type: '여행/레저',
      maxCompensation: 19000,
      periodOfInsurance: '6년',
      paymentCycle: '분기별',
      paymentPeriod: '15년',
      ageOfTarget: '25-60세',
      basicPremium: 700,
      rate: '7%',
      distributionStatus: false,
      authorization: true,
      TermsIDList: '2,7,12',
      insuranceClausePeriod: '14년',
      precaution: '주의사항 10'
    }
  ];

  useEffect(() => {
    axios
      .get(
        'https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/insurances/all'
      )
      .then((response) => {
        console.log(response);
        if (response.data) {
          setInsuranceData(response.data);
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

  const filteredClubData: InsuranceProps[] = dummyInsuranceData.filter(
    (insurance) => {
      const typeMatch = !selectedType || insurance.type === selectedType;
      return typeMatch;
    }
  );
  return (
    <Wrapper>
      <Content>
        <Introduction>
          <h2>카테고리별 상품 조회</h2>
        </Introduction>
        <Sidebar
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
  height: 160px;
  margin-top: 8px;
  margin-right: 45px;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 30px 3px rgba(76, 76, 255, 0.25);
`;
