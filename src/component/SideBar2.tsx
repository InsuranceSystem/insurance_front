import React from 'react';
import styled from 'styled-components';
import '../App.css';
interface SidebarProps {
  selectedIsMaturity: boolean | false;
  setSelectedIsMaturity: (maturity: boolean | false) => void;
  selectedIsCancellation: boolean | false;
  setSelectedIsCancellation: (cancellation: boolean | false) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedIsMaturity,
  setSelectedIsMaturity,
  selectedIsCancellation,
  setSelectedIsCancellation
}) => {
  return (
    <SidebarBackground>
      <>
        <InterestOption
          onClick={() => {
            setSelectedIsMaturity(false);
            setSelectedIsCancellation(false);
          }}
          active={
            selectedIsMaturity === false && selectedIsCancellation === false
          }>
          <Content>전체</Content>
        </InterestOption>
        <InterestOption
          onClick={() => {
            setSelectedIsMaturity(true);
            setSelectedIsCancellation(false);
          }}
          active={selectedIsMaturity === true}>
          <Content>만기 보험</Content>
        </InterestOption>
        <InterestOption
          onClick={() => {
            setSelectedIsCancellation(true);
            setSelectedIsMaturity(false);
          }}
          active={selectedIsCancellation === true}>
          <Content>해지 보험</Content>
        </InterestOption>
      </>
    </SidebarBackground>
  );
};

export default Sidebar;

interface SidebarOptionProps {
  active: boolean;
}
const Type = styled.div`
  margin-top: 21px;
`;
const Icon = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  margin-bottom: 50px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
  width: 530px;
  height: 70px;
  flex-shrink: 0;
  box-shadow: 0px 4px 30px 3px rgba(42, 114, 255, 0.25);
  transition: height 0.3s ease;
  overflow: hidden;
`;
const SpecialInterestOption = styled.div<SidebarOptionProps>`
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
  line-height: 50px;
  color: rgba(0, 0, 0, 0.5);
  padding: 9px;
  margin-left: 7px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  height: 50px;
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
