import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import scrollbar from '../../../assets/scrollBar.svg';
import SelectType from '../../../component/Selector/SelectType';
import SelectPeriod from '../../../component/Selector/SelectPeriod';
import SelectAge from '../../../component/Selector/SelectAge';
import SelectDistribution from '../../../component/Selector/SelectDistribution';
import SelectTerms from '../../../component/Selector/SelectTerms';

function DesignInsurance() {
  const [name, setName] = useState('');
  const [basicPremium, setBasicPremium] = useState('');
  const [insuranceClausePeriod, setInsuranceClausePeriod] = useState('');
  const [type, setType] = useState('');
  const [maxCompensation, setMaxCompensation] = useState('');
  const [periodOfInsurance, setPeriodOfInsurance] = useState('');
  const [distributionStatus, setDistributionStatus] = useState(false);
  const [ageOfTarget, setAgeOfTarget] = useState('');
  const [precaution, setPrecaution] = useState('');
  const [termsIdList, setTermsIdList] = useState<string[]>([]);
  const handleTypeChange = (Type: string | null) => {
    if (Type !== null) {
      setType(Type);
    }
  };
  const handleClausePeriodChange = (Period: string | null) => {
    if (Period !== null) {
      setInsuranceClausePeriod(Period);
    }
  };
  const handlePeriodChange = (Period: string | null) => {
    if (Period !== null) {
      setPeriodOfInsurance(Period);
    }
  };
  const handleAgeChange = (Age: string | null) => {
    if (Age !== null) {
      setAgeOfTarget(Age);
    }
  };
  const handleDistributionChange = (Age: boolean | false) => {
    if (Age !== null) {
      setDistributionStatus(Age);
    }
  };

  // Update the isFormComplete state whenever any required field changes
  const handleSubmit = async () => {
    const applicationData = {
      insuranceName: name,
      type: type,
      maxCompensation: Number(maxCompensation),
      periodOfInsurance: periodOfInsurance,
      ageOfTarget: ageOfTarget,
      basicPremium: Number(basicPremium),
      distributionStatus: distributionStatus,
      insuranceClausePeriod: insuranceClausePeriod,
      precaution: precaution,
      termsIdList: termsIdList.join(',')
    };
    console.log(applicationData);
    const formData = new FormData();
    formData.append(
      'applicationRequestDto',
      new Blob([JSON.stringify(applicationData)], { type: 'application/json' })
    );
    try {
      const response = await axios.post(
        '/api/insurances/design',
        applicationData
      );

      console.log(response);

      if (response.status === 201) {
        console.log('ApplyInsurance submitted successfully');
        alert('설계서 등록이 완료되었습니다.');
      } else {
        console.error('ApplyInsurance submission failed');
        alert('등록 실패');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  const handleSelectedTagsChange = (tags: string[]) => {
    setTermsIdList(tags);
    console.log(tags);
  };
  return (
    <Container>
      <Container>
        <Title>새 보험 등록</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Blank></Blank>
          <SmallTitle>
            보험명<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={'예시 - 자동차보험A'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            유형 선택<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectType value={type} onChange={handleTypeChange}></SelectType>
          <SmallTitle>
            최대 보장한도<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='maxCompensation'
            type='text'
            value={maxCompensation}
            onChange={(e) => setMaxCompensation(e.target.value)}
            placeholder={'숫자만 입력해주세요'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            기본 보험료<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='maxCompensation'
            type='text'
            value={basicPremium}
            onChange={(e) => setBasicPremium(e.target.value)}
            placeholder={'숫자만 입력해주세요'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            보험 기간<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectPeriod
            value={periodOfInsurance}
            onChange={handlePeriodChange}></SelectPeriod>
          <SmallTitle>
            보험 면책 기간<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectPeriod
            value={insuranceClausePeriod}
            onChange={handleClausePeriodChange}></SelectPeriod>
          <SmallTitle>
            추천 연령대<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectAge value={ageOfTarget} onChange={handleAgeChange}></SelectAge>
          <SmallTitle>
            배당 여부 설정<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectDistribution
            value={distributionStatus}
            onChange={handleDistributionChange}></SelectDistribution>
          <SmallTitle>
            약관 선택<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectTerms
            selectedTags={termsIdList}
            onChange={handleSelectedTagsChange}></SelectTerms>
          <SmallTitle>
            주의사항 입력<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <ActivityContent
            placeholder={'주의사항 (최대 500자)'}
            value={precaution}
            onChange={(e) => setPrecaution(e.target.value)}
          />
          <Link to={'/admin/insurance'}>
            <SubmitButton type='button' onClick={handleSubmit}>
              작성 완료
            </SubmitButton>
          </Link>
        </Form>
      </Container>
    </Container>
  );
}

export default DesignInsurance;
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
const DownWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
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
const Agree = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
}`;
const BasicInfoAsterisk = styled.span`
  color: red;
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 16px;
  height: 16px;
  margin-top: 8px;
  margin-right: 7px;
  margin-left: 660px;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;

const ScrollableContent = styled.div`
  max-height: 140px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 10px;
  width: 690px;
  margin-left: 30px;
  border-radius: 4px;
  scrollbar-width: none; /* Remove default scrollbar */
  &::-webkit-scrollbar {
    width: 4px; /* Set width of the new custom scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    background-image: url(${scrollbar});
    background-repeat: no-repeat;
    background-size: 4px 134px;
    border-radius: 2px; /* Rounded corners for the thumb */
  }
`;

const PrivacyAgreement = styled.div`
  font-size: 12px;
  line-height: 1.5;
  max-width: 100%;
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
  height: 1070px;
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
