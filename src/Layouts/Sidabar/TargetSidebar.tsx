import React from 'react';
import styled from 'styled-components';
import '../../App.css';
interface SidebarProps {
  selectedIsEXPIRED: boolean | false;
  setSelectedIsEXPIRED: (proceeding: boolean | false) => void;
  selectedIsUNPAID: boolean | false;
  setSelectedIsUNPAID: (cancellation: boolean | false) => void;
  selectedIsRESURRECT: boolean | false;
  setSelectedIsRESURRECT: (cancellation: boolean | false) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedIsEXPIRED,
  setSelectedIsEXPIRED,
  selectedIsUNPAID,
  setSelectedIsUNPAID,
  selectedIsRESURRECT,
  setSelectedIsRESURRECT
}) => {
  return (
    <SidebarBackground>
      <>
        <InterestOption
          onClick={() => {
            setSelectedIsEXPIRED(true);
            setSelectedIsUNPAID(false);
            setSelectedIsRESURRECT(false);
          }}
          active={selectedIsEXPIRED === true}>
          <Content>만기 대상자</Content>
        </InterestOption>
        <InterestOption
          onClick={() => {
            setSelectedIsEXPIRED(false);
            setSelectedIsUNPAID(true);
            setSelectedIsRESURRECT(false);
          }}
          active={selectedIsUNPAID === true}>
          <Content>미납 대상자</Content>
        </InterestOption>
        <InterestOption
          onClick={() => {
            setSelectedIsEXPIRED(false);
            setSelectedIsUNPAID(false);
            setSelectedIsRESURRECT(true);
          }}
          active={selectedIsRESURRECT === true}>
          <Content>부활 대상자</Content>
        </InterestOption>
      </>
    </SidebarBackground>
  );
};

export default Sidebar;

interface SidebarOptionProps {
  active: boolean;
}
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
  margin-right: 550px;
  padding: 20px;
  width: 530px;
  height: 70px;
  flex-shrink: 0;
  border: 2px solid #dbdbdf;
  transition: height 0.3s ease;
  overflow: hidden;
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
