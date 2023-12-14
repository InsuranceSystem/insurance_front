import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { CancelContentProps } from '../../../../../component/Props/CancelContentProps';
import SelectBank from '../../../../../component/Selector/SelectBank';

function Cancel() {
  const location = useLocation();
  const state = location.state;
  const idFromState = state?.id;
  const type = state?.type;
  const [cancelContentData, setCancelContentData] =
    useState<CancelContentProps | null>(null);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [bankNum, setBankNum] = useState('');
  const [bankOwnerName, setBankOwnerName] = useState('');
  const [bank, setBank] = useState('');
  useEffect(() => {
    const id = Number(idFromState);
    axios
      .get(`/api/contracts/${id}/cancel-content`)
      .then((response) => {
        if (response.data.data) {
          setCancelContentData(response.data.data);
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  }, [idFromState]);
  const handleSubmit = async () => {
    console.log(idFromState);
    const idNum = Number(idFromState);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phoneNumber', number);
    formData.append('bankName', bank);
    formData.append('accountNumber', bankNum);
    formData.append('accountHolder', bankOwnerName);
    for (const key of formData.keys()) {
      console.log(key, ':', formData.get(key));
    }
    try {
      const response = await axios.post(
        `/api/contracts/${idNum}/cancel`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        alert('해지가 완료되었습니다. 입금까지는 최대 7일이 소요됩니다.');
      } else {
        alert('해지에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  const handleBankChange = (Age: string | null) => {
    if (Age !== null) {
      setBank(Age);
    }
  };
  return (
    <Container>
      <Container>
        <Title>{type}해지 신청</Title>
        <Form2 onSubmit={(e) => e.preventDefault()}>
          <Blank2></Blank2>
          <SmallTitle>총 납입 보험료</SmallTitle>
          <Basic>{cancelContentData?.totalPremiumPaid} 원</Basic>
          <BorderLine2></BorderLine2>
          <SmallTitle>예상 환급 금액</SmallTitle>
          <Basic>{cancelContentData?.refundAmount} 원</Basic>
          <BorderLine2></BorderLine2>
        </Form2>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Blank></Blank>
          <SmallTitle>
            접수자명<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={'예시 - 홍길동'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            전화번호<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='number'
            type='text'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder={'예시 - 전화번호'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            은행 선택<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectBank onChange={handleBankChange}></SelectBank>
          <SmallTitle>
            예금주명<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='maxCompensation'
            type='text'
            value={bankOwnerName}
            onChange={(e) => setBankOwnerName(e.target.value)}
            placeholder={'예시-홍길동'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            계좌번호<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='maxCompensation'
            type='text'
            value={bankNum}
            onChange={(e) => setBankNum(e.target.value)}
            placeholder={'숫자만 입력해주세요'}
          />
          <BorderLine2></BorderLine2>
          <Link to={'/user/management'}>
            <SubmitButton type='button' onClick={handleSubmit}>
              작성 완료
            </SubmitButton>
          </Link>
        </Form>
      </Container>
    </Container>
  );
}

export default Cancel;
const BorderLine2 = styled.hr`
  stroke-width: 2px;
  width: 700px;
  flex-shrink: 0;
  margin-left: 36px;
  margin-right: 8px;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 6px;
  margin-bottom: 25px;
`;
const BasicInput = styled.input`
  width: 600px;
  height: 16px;
  padding: 0px;
  flex-shrink: 0;
  border: none;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-bottom: 0px;
  margin-top: 10px;
  outline: none;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;
const Blank = styled.div`
  height: 30px;
`;
const Blank2 = styled.div`
  height: 17px;
`;
const Title = styled.div`
  margin-top: 60px;
  font-size: 30px;
  margin-bottom: 10px;
  margin-right: 680px;
  font-family: 'GmarketSansMedium';
`;

const SmallTitle = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-bottom: 2px;
}`;
const Basic = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-bottom: 2px;
  margin-top: 10px;
}`;
const BasicInfoAsterisk = styled.span`
  color: red;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
`;

const Form = styled.form`
  border-radius: 13px;
  background: #fff;
  padding: 20px;
  width: 800px;
  height: 500px;
  border: 2px solid #dbdbdf;
  margin-bottom: 50px;
  margin-left: 8px;
  margin-top: 30px;
`;
const Form2 = styled.form`
  border-radius: 13px;
  background: #fff;
  padding: 20px;
  width: 800px;
  height: 150px;
  border: 2px solid #dbdbdf;
  margin-left: 8px;
  margin-top: 30px;
`;
const SubmitButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 200px;
  height: 41px;
  margin-right: 10px;
  margin-left: 300px;
  margin-top: 20px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background: #428aff;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 41px;
  letter-spacing: -2px;
  cursor: pointer;

  &:hover {
    background-color: #0461e5;
  }

  &:disabled {
    border: 1px solid #a6c8ff;
    background: #8fbaff;
    cursor: not-allowed;
  }

  &:disabled:hover {
    background-color: #8fbaff;
  }
`;
