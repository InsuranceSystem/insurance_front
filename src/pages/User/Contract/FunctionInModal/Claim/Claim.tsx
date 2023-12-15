import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import StyledFileInput from '../../../../../component/Selector/StyledFileInput';
import SelectRelation from '../../../../../component/Selector/SelectRelation';
import SelectBank from '../../../../../component/Selector/SelectBank';

function Claim() {
  const location = useLocation();
  const state = location.state;
  const idFromState = state?.id;
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [relation, setRelation] = useState('');
  const [bankNum, setBankNum] = useState('');
  const [bankOwnerName, setBankOwnerName] = useState('');
  const [bank, setBank] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleRelationChange = (relation: string | null) => {
    if (relation !== null) {
      setRelation(relation);
    }
  };
  const handleBankChange = (Age: string | null) => {
    if (Age !== null) {
      setBank(Age);
    }
  };

  // Update the isFormComplete state whenever any required field changes
  const handleSubmit = async () => {
    console.log(idFromState);
    const id = Number(idFromState);
    const surveyed = false;
    const formData = new FormData();
    formData.append('receptionistName', name);
    formData.append('receptionistPNumber', number);
    formData.append('relationshipOfContractor', relation);
    formData.append('bank', bank);
    formData.append('accountNumber', bankNum);
    formData.append('accountHolderName', bankOwnerName);
    formData.append('documentFile', selectedFile || '');
    for (const key of formData.keys()) {
      console.log(key, ':', formData.get(key));
    }
    try {
      const response = await axios.post(
        `/api/compensation-claim/claim/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log(response);

      if (response.status === 200) {
        alert('청구 신청이 완료되었습니다.');
      } else {
        alert('청구에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  return (
    <Container>
      <Container>
        <Title>보상금 청구</Title>
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
            placeholder={'하이픈 없이 입력 (예시 - 01012345678)'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            관계 선택<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectRelation
            onChange={(relationship: string | null) =>
              handleRelationChange(relationship || 'default value')
            }
          />
          <SmallTitle>
            구비서류 업로드<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <StyledFileInput onChange={handleFileChange} />
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

export default Claim;

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
  height: 670px;
  border: 2px solid #dbdbdf;
  margin-bottom: 50px;
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
