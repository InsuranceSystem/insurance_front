import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import StyledFileInput from '../../../../../component/Selector/StyledFileInput';
import SelectRelation from '../../../../../component/Selector/SelectRelation';
import SelectBank from '../../../../../component/Selector/SelectBank';
import SelectAccidentType from '../../../../../component/Selector/SelectAccidentType';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calender_icon from '../../../../../assets/calendar-star.svg';

function Claim() {
  const location = useLocation();
  const state = location.state;
  const idFromState = state?.id;
  const [name, setName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [license, setLicense] = useState('');
  const [content, setContent] = useState('');
  const [place, setPlace] = useState('');
  const [accidentType, setAccidentType] = useState('');
  const [number, setNumber] = useState('');
  const [relation, setRelation] = useState('');
  const [bankNum, setBankNum] = useState('');
  const [bankOwnerName, setBankOwnerName] = useState('');
  const [bank, setBank] = useState('');
  const [time, setTime] = useState('');
  const [carNum, setCarNum] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [accidentDate, setAccidentDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState('');
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더해줍니다.
      const day = date.getDate();
      setFormattedDate(date.toISOString().substr(0, 19));
      const fdate = `${year}-${month}-${day}`;
      // yyyy-mm-dd 형식의 문자열을 Date 객체로 변환
      const parsedDate = new Date(fdate);
      setAccidentDate(parsedDate);
    } else {
      // 예외 처리: 날짜가 null인 경우 처리
      // 예를 들어, 유효한 날짜를 입력하지 않은 경우 처리할 내용을 작성할 수 있습니다.
    }
  };
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
  const handleTypeChange = (type: string | null) => {
    if (type !== null) {
      setAccidentType(type);
    }
  };
  // Update the isFormComplete state whenever any required field changes
  const handleSubmit = async () => {
    console.log(idFromState);
    const idNum = Number(idFromState);

    const formData = new FormData();
    formData.append('receptionistName', name);
    formData.append('receptionistPNumber', number);
    formData.append('relationshipOfContractor', relation);
    formData.append('bank', bank);
    formData.append('accountNumber', bankNum);
    formData.append('accountHolderName', bankOwnerName);
    formData.append('type', accidentType);
    formData.append('dateTime', formattedDate);
    formData.append('place', place);
    formData.append('carNumber', carNum);
    formData.append('driverName', driverName);
    formData.append('licenseNumber', license);
    formData.append('accidentDetail', content);
    formData.append('documentFile', selectedFile || '');

    for (const key of formData.keys()) {
      console.log(key, ':', formData.get(key));
    }

    try {
      const response = await axios.post(
        `/api/compensation-claim/claim/car/${idNum}`,
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
          <SmallTitle>
            사고 유형<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectAccidentType
            value={accidentType}
            onChange={handleTypeChange}></SelectAccidentType>
          <SmallTitle>
            사고 일자<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectedDate
            selected={accidentDate}
            onChange={handleDateChange}
            dateFormat='yyyy-MM-dd'
          />
          <ProfileInput
            type='text'
            name='phone'
            value={time}
            placeholder={'XX:YY - 사고 일시 입력'}
            onChange={(e) => setTime(e.target.value)}
          />
          <SmallTitle>
            사고 장소<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='maxCompensation'
            type='text'
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder={'숫자만 입력해주세요'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            차량 번호<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='maxCompensation'
            type='text'
            value={carNum}
            onChange={(e) => setCarNum(e.target.value)}
            placeholder={'12가 1234'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            운전자명<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='maxCompensation'
            type='text'
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            placeholder={'예시 - 홍길동'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            면허번호<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='maxCompensation'
            type='text'
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            placeholder={'숫자만 입력해주세요'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            사고 내용<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <ActivityContent
            placeholder={'사고내용 (최대 500자)'}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Link to={'/user/retrieve'}>
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
const ActivityContent = styled.textarea`
  width: 690px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #dbdbdf;
  background: #fafafa;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-top: 12px;
  margin-bottom: 10px;
  padding: 12px 12px;
  resize: none;
  outline: none;
  position: relative;
  &::placeholder {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 0;
    color: rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }
`;
const ProfileInput = styled.input`
  width: 14rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 0.6rem;
  border: 1px solid #dbdbdf;
  background: #ffffff;
  color: rgba(0, 0, 0, 0.7);
  font-family: GmarketSansLight;
  font-size: 0.875rem;
  font-style: normal;
  line-height: normal;
  padding-left: 0.5rem;
  margin-top: 10px;
  margin-left: 35px;
  margin-right: 500px;
  margin-bottom: 20px;
`;
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
  height: 1370px;
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
const SelectedDate = styled(DatePicker)`
  width: 710px;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 0.6rem;
  border: 1px solid #dbdbdf;
  background: #ffffff;
  color: rgba(0, 0, 0, 0.7);
  font-family: GmarketSansLight;
  font-size: 0.875rem;
  font-style: normal;
  line-height: normal;
  padding-left: 0.5rem;
  margin-left: 35px;
  margin-top: 10px;
  dateformat: yyyy-MM-dd;
  background-image: url(${calender_icon});
  background-size: 17px;
  background-repeat: no-repeat;
  background-position: calc(100% - 7px) center;
  outline: none;
`;
