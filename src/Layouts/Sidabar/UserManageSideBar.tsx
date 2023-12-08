import React from 'react';
import styled from 'styled-components';
import '../../App.css';
interface SidebarProps {
  selectedIsManager: boolean | false;
  setSelectedIsManager: (OnSale: boolean | false) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedIsManager,
  setSelectedIsManager
}) => {
  return (
    <SidebarBackground>
      <>
        <InterestOption
          onClick={() => {
            setSelectedIsManager(false);
          }}
          active={selectedIsManager === false}>
          <Content>일반 고객 조회</Content>
        </InterestOption>
        <InterestOption
          onClick={() => {
            setSelectedIsManager(true);
          }}
          active={selectedIsManager === true}>
          <Content>직원 조회</Content>
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
  border-radius: 30px;
  background: #fff;
  margin-top: 10px;
  margin-right: 730px;
  padding: 20px;
  padding-top: 15px;
  width: 350px;
  height: 30px;
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
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
  padding: 9px;
  margin-left: 7px;
  margin-bottom: 7px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  height: 20px;
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
