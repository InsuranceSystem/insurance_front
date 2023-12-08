import React from 'react';
import styled from 'styled-components';
import '../../App.css';
import car from '../../assets/car.svg';
import driver from '../../assets/driver.svg';
import dentist from '../../assets/dentist.svg';
import fire from '../../assets/fire.svg';
import heart from '../../assets/heart.svg';
import house from '../../assets/house.svg';
import kids from '../../assets/kids.svg';
import pet from '../../assets/pet.svg';
import silson from '../../assets/silson.svg';
import lesure from '../../assets/lesure.svg';
import medic from '../../assets/medic.svg';
interface SidebarProps {
  selectedType: string | null;
  setSelectedType: (interest: string | null) => void;
}

const InsuranceSideBar: React.FC<SidebarProps> = ({
  selectedType,
  setSelectedType
}) => {
  return (
    <SidebarBackground>
      <>
        <AllOption
          onClick={() => setSelectedType(null)}
          active={selectedType === null}>
          <Content>전체</Content>
        </AllOption>
        <InterestOption
          onClick={() => setSelectedType('자동차')}
          active={selectedType === '자동차'}>
          <Content>
            <Icon src={car}></Icon>
            <Type>자동차</Type>
          </Content>
        </InterestOption>
        <InterestOption
          onClick={() => setSelectedType('운전자')}
          active={selectedType === '운전자'}>
          <Content>
            <Icon src={driver}></Icon>
            <Type>운전자</Type>
          </Content>
        </InterestOption>
        <InterestOption
          onClick={() => setSelectedType('실손')}
          active={selectedType === '실손'}>
          <Content>
            <Icon src={silson}></Icon>
            <Type>실손</Type>
          </Content>
        </InterestOption>
        <InterestOption
          onClick={() => setSelectedType('자녀')}
          active={selectedType === '자녀'}>
          <Content>
            <Icon src={kids}></Icon>
            <Type>자녀</Type>
          </Content>
        </InterestOption>
        <InterestOption
          onClick={() => setSelectedType('건강')}
          active={selectedType === '건강'}>
          <Content>
            <Icon src={heart}></Icon>
            <Type>건강</Type>
          </Content>
        </InterestOption>
        <InterestOption
          onClick={() => setSelectedType('유병자')}
          active={selectedType === '유병자'}>
          <Content>
            <Icon src={medic}></Icon>
            <Type>유병자</Type>
          </Content>
        </InterestOption>
        <InterestOption
          onClick={() => setSelectedType('치아')}
          active={selectedType === '치아'}>
          <Content>
            <Icon src={dentist}></Icon>
            <Type>치아</Type>
          </Content>
        </InterestOption>
        <InterestOption
          onClick={() => setSelectedType('화재')}
          active={selectedType === '화재'}>
          <Content>
            <Icon src={fire}></Icon>
            <Type>화재</Type>
          </Content>
        </InterestOption>
        <InterestOption
          onClick={() => setSelectedType('재산')}
          active={selectedType === '재산'}>
          <Content>
            <Icon src={house}></Icon>
            <Type>재산</Type>
          </Content>
        </InterestOption>
        <SpecialInterestOption
          onClick={() => setSelectedType('여행/레저')}
          active={selectedType === '여행/레저'}>
          <Content>
            <Icon src={lesure}></Icon>
            <Type>여행/레저</Type>
          </Content>
        </SpecialInterestOption>
        <InterestOption
          onClick={() => setSelectedType('펫')}
          active={selectedType === '펫'}>
          <Content>
            <Icon src={pet}></Icon>
            <Type>펫</Type>
          </Content>
        </InterestOption>
      </>
    </SidebarBackground>
  );
};

export default InsuranceSideBar;

interface SidebarOptionProps {
  active: boolean;
}
const Type = styled.div`
  height: 20px;
`;
const Icon = styled.img`
  width: 40px;
  height: 40px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SidebarBackground = styled.div`
  display: flex;
  border-radius: 10px;
  background: #fff;
  margin-top: 10px;
  margin-left: 50px;
  padding: 20px;
  width: 1130px;
  height: 100px;
  flex-shrink: 0;
  border: 2px solid #dbdbdf;
  transition: height 0.3s ease;
  overflow: hidden;
`;
const SpecialInterestOption = styled.div<SidebarOptionProps>`
  font-size: 17px;
  font-style: normal;
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.5);
  padding: 9px;
  margin-left: 7px;
  border-radius: 5px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 180px;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(237, 237, 237, 0.6);
    color: rgba(0, 0, 0, 0.95);
  }

  ${(props) =>
    props.active &&
    `
    background-color: rgba(237, 237, 237, 0.60);
    color: rgba(0, 0, 0, 0.95);
    border-radius: 5px;
  `}
`;
const InterestOption = styled.div<SidebarOptionProps>`
  font-size: 17px;
  font-style: normal;
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.5);
  padding: 9px;
  margin-left: 7px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 150px;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(237, 237, 237, 0.6);
    color: rgba(0, 0, 0, 0.95);
  }

  ${(props) =>
    props.active &&
    `
    background-color: rgba(237, 237, 237, 0.60);
    color: rgba(0, 0, 0, 0.95);
    border-radius: 5px;
  `}
`;
const AllOption = styled.div<SidebarOptionProps>`
  font-size: 17px;
  font-style: normal;
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  line-height: 80px;
  color: rgba(0, 0, 0, 0.5);
  padding: 9px;
  margin-left: 7px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 150px;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(237, 237, 237, 0.6);
    color: rgba(0, 0, 0, 0.95);
  }

  ${(props) =>
    props.active &&
    `
    background-color: rgba(237, 237, 237, 0.60);
    color: rgba(0, 0, 0, 0.95);
    border-radius: 5px;
  `}
`;
