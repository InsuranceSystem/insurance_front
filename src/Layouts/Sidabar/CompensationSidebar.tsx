import React from 'react';
import styled from 'styled-components';
import '../../App.css';
interface SidebarProps {
  selectedIsProceeding: boolean | false;
  setSelectedIsProceeding: (proceeding: boolean | false) => void;
  selectedIsCompleted: boolean | false;
  setSelectedIsCompleted: (cancellation: boolean | false) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedIsProceeding,
  setSelectedIsProceeding,
  selectedIsCompleted,
  setSelectedIsCompleted
}) => {
  return (
    <SidebarBackground>
      <>
        <InterestOption
          onClick={() => {
            setSelectedIsProceeding(false);
            setSelectedIsCompleted(false);
          }}
          active={
            selectedIsProceeding === false && selectedIsCompleted === false
          }>
          <Content>전체</Content>
        </InterestOption>
        <InterestOption
          onClick={() => {
            setSelectedIsProceeding(true);
            setSelectedIsCompleted(false);
          }}
          active={selectedIsProceeding === true}>
          <Content>처리 중</Content>
        </InterestOption>
        <InterestOption
          onClick={() => {
            setSelectedIsCompleted(true);
            setSelectedIsProceeding(false);
          }}
          active={selectedIsCompleted === true}>
          <Content>처리 완료</Content>
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
