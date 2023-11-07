import styled from 'styled-components';
import '../../App.css';

export const CardContainer = styled.div`
  padding: 10px;
  cursor: pointer;
  float: left;
  flex-direction: column;
`;

export const CardInfo = styled.div`
  float: right;
  margin-left: 11px;
  h3 {
    width: 86px;
    margin-top: 31px;
    font-family: 'GmarketSansMedium';
    color: rgba(0, 0, 0, 0.8);
    text-edge: cap;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  p {
    color: #000;
    margin-top: 15px;
    margin-bottom: 7px;
    margin-left: 4px;
    leading-trim: both;
    text-edge: cap;
    font-family: 'GmarketSansLight';
    font-size: 14.8px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

export const Status = styled.span`
  height: 27px;
  flex-shrink: 0;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 10px;
  background: rgba(255, 122, 122, 0.1);
  color: #ff4141;
  leading-trim: both;
  text-edge: cap;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 29.5px;
  align-items: center;
  text-align: center;
  margin-top: 15px;
  font-family: 'GmarketSansMedium';
  margin-left: auto;
`;

export const Details = styled.div`
  text-align: right;
  vertical-align: middle;
  font-size: 14px;
  font-family: 'GmarketSansLight';
  line-height: auto;
  color: #000000;
  margin-left: 17px;
  margin-bottom: 41px;
`;
export const Name = styled.div`
  width: 200px;
  margin-top: 31px;
  font-family: 'GmarketSansMedium';
  color: rgba(0, 0, 0, 1);
  text-edge: cap;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 310px;
`;

export const UpWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
