import React from 'react';
import styled from 'styled-components';
import '../../App.css';
interface SidebarProps {
  selectedIsMaturity: boolean | false;
  setSelectedIsMaturity: (maturity: boolean | false) => void;
  selectedIsCancellation: boolean | false;
  setSelectedIsCancellation: (cancellation: boolean | false) => void;
  selectedIsApplication: boolean | false;
  setSelectedIsApplication: (application: boolean | false) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedIsMaturity,
  setSelectedIsMaturity,
  selectedIsCancellation,
  setSelectedIsCancellation,
  selectedIsApplication,
  setSelectedIsApplication
}) => {
  return (
    <SidebarBackground>
      <>
        <InterestOption
          onClick={() => {
            setSelectedIsMaturity(false);
            setSelectedIsCancellation(false);
            setSelectedIsApplication(false);
          }}
          active={
            selectedIsMaturity === false &&
            selectedIsCancellation === false &&
            selectedIsApplication === false
          }>
          <Content>전체</Content>
        </InterestOption>
        <InterestOption
          onClick={() => {
            setSelectedIsMaturity(true);
            setSelectedIsCancellation(false);
            setSelectedIsApplication(false);
          }}
          active={selectedIsMaturity === true}>
          <Content>만기 계약</Content>
        </InterestOption>
        <InterestOption
          onClick={() => {
            setSelectedIsCancellation(true);
            setSelectedIsMaturity(false);
            setSelectedIsApplication(false);
          }}
          active={selectedIsCancellation === true}>
          <Content>해지 계약</Content>
        </InterestOption>
        <InterestOption
          onClick={() => {
            if (!selectedIsApplication) {
              setSelectedIsCancellation(false);
              setSelectedIsMaturity(false);
              setSelectedIsApplication(true);
            }
          }}
          active={selectedIsApplication === true}>
          <Content>계약 심사 조회</Content>
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
  margin-right: 450px;
  padding: 20px;
  width: 650px;
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
