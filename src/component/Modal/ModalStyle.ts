import styled from 'styled-components';

export const ModalWrapper = styled.div`
  width: 861px;
  height: 626px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 20px 10px rgba(0, 0, 0, 0.05);
  margin-top: 10px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 600px;
`;

export const Title = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: 'GmarketSansMedium';
  font-size: 35px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 30px;
  margin-top: 15px;
  margin-bottom: 2px;
`;

export const Description = styled.div`
  width: 772px;
  height: 208px;
  border-radius: 10px;
  margin-left: 30px;
  background: #fff;
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.05);
  margin-top: 40px;
`;

export const Description2 = styled.div`
  width: 772px;
  height: 102px;
  border-radius: 10px;
  margin-left: 30px;
  background: #fff;
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.05);
  margin-top: 40px;
`;

export const ActivePeriod = styled.div`
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.05);
  width: 159px;
  height: 36px;
  flex-shrink: 0;
  color: rgba(0, 0, 0, 0.7);
  leading-trim: both;
  text-edge: cap;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
  margin-left: 30px;
  margin-top: 10px;
`;

export const Period = styled.div`
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.05);
  width: 159px;
  height: 36px;
  flex-shrink: 0;
  color: rgba(0, 0, 0, 0.7);
  leading-trim: both;
  text-edge: cap;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
`;

export const SubTitle = styled.div`
  color: rgba(0, 0, 0, 0.8);
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 30px;
  margin-top: 40px;
  padding-top: 20px;
`;

export const Basic = styled.div`
  color: rgba(0, 0, 0, 0.7);
  font-family: 'GmarketSansMedium';
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 30px;
  margin-top: 20px;
`;

export const Content = styled.div`
  color: rgba(0, 0, 0, 0.7);
  font-family: 'GmarketSansMedium';
  font-size: 12.8px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 30px;
  margin-top: 12px;
  width: 714px;
  leading-trim: both;
  text-edge: cap;
`;

export const PeriodContent = styled.div`
  color: rgba(0, 0, 0, 0.7);
  font-family: 'GmarketSansMedium';
  font-size: 12.8px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 15px;
  margin-top: 12px;
  width: 50px;
  leading-trim: both;
  text-edge: cap;
`;

export const PeriodWrapper = styled.div`
  color: rgba(0, 0, 0, 0.7);
  font-family: 'GmarketSansMedium';
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 30px;
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
`;

export const SupportButton = styled.button`
  font-family: 'GmarketSansMedium';
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  width: 104px;
  height: 40px;
  line-height: 41px;
  border-radius: 15px;
  background: rgba(0, 47, 213, 0.05);
  color: #002fd5;
  border: none;
  margin-top: 43px;
  margin-left: 376px;
  margin-bottom: 40px;
  &:hover {
    background-color: #002fd5;
    color: #ffffff;
  }

  &:active {
    color: #002fd5;
  }
`;
export const PayButton = styled.button`
  font-family: 'GmarketSansMedium';
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  width: 104px;
  height: 40px;
  line-height: 41px;
  border-radius: 15px;
  background: rgba(0, 47, 213, 0.05);
  color: #002fd5;
  border: none;
  margin-top: 43px;
  margin-bottom: 40px;
  &:hover {
    background-color: #002fd5;
    color: #ffffff;
  }

  &:active {
    color: #002fd5;
  }
`;
export const ClaimButton = styled.button`
  font-family: 'GmarketSansMedium';
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  width: 104px;
  height: 40px;
  line-height: 41px;
  border-radius: 15px;
  background: rgba(0, 47, 213, 0.05);
  color: #002fd5;
  border: none;
  margin-top: 43px;
  margin-left: 286px;
  margin-bottom: 40px;
  margin-right: 30px;
  &:hover {
    background-color: #002fd5;
    color: #ffffff;
  }

  &:active {
    color: #002fd5;
  }
`;
