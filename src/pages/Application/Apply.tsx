import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StyledFileInput from './StyledFileInput';
import axios from 'axios';
import { Link } from 'react-router-dom';
import scrollbar from '../../assets/scrollBar.svg';
import SelectCycle from '../../component/Selector/SelectCycle';

function Apply() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [countdown, setCountdown] = useState<number>(300);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [depositorName, setDepositorName] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const cleanPhoneNumber = (input: string) => {
    return input.replace(/-/g, '');
  };
  useEffect(() => {
    // Daum 우편번호 서비스 스크립트 동적 로드
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);
  const handleDeviceTypeChange = (newCourier: string | null) => {
    if (newCourier !== null) {
      setSelectedDevice(newCourier);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (countdown > 0 && isEmailVerified && !isVerificationCompleted) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0 || isVerificationCompleted) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countdown, isEmailVerified, isVerificationCompleted]);
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Update the isFormComplete state whenever any required field changes
  useEffect(() => {
    const allFieldsFilled =
      name !== '' &&
      phoneNumber !== '' &&
      email !== '' &&
      selectedDevice !== '' &&
      selectedReason !== '' &&
      selectedFile !== null &&
      address !== '' &&
      detailAddress !== '' &&
      depositorName !== '' &&
      isCheckboxChecked;

    setIsFormComplete(allFieldsFilled);
  }, [
    name,
    phoneNumber,
    email,
    selectedDevice,
    selectedReason,
    selectedFile,
    address,
    detailAddress,
    depositorName,
    isCheckboxChecked
  ]);
  const handleSubmit = async () => {
    if (!isCheckboxChecked) {
      return;
    }

    const verificationToken = localStorage.getItem('verificationToken');

    if (!verificationToken) {
      console.error('Verification token not found');
      return;
    }

    const applicationData = {
      name: name,
      phoneNum: phoneNumber,
      device: selectedDevice,
      applicationReason: selectedReason,
      email: email,
      detailAddress: detailAddress,
      roadAddress: address,
      depositorName: depositorName
    };

    const formData = new FormData();
    formData.append(
      'applicationRequestDto',
      new Blob([JSON.stringify(applicationData)], { type: 'application/json' })
    ); // Apply data as JSON
    formData.append('file', selectedFile as Blob);
    try {
      const response = await axios.post('/api/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // 올바른 Content-Type 설정
        }
      });

      if (response.status === 200) {
        console.log('Apply submitted successfully');
      } else {
        console.error('Apply submission failed');
      }
    } catch (error) {
      const err = error as Error;
      console.error('폼 제출 오류:', err.message);
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
        <Title>신청서 작성</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Blank></Blank>
          <SmallTitle>
            청약서 업로드<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <StyledFileInput onChange={handleFileChange} />
          <SmallTitle>
            희망 납입 주기<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectCycle onChange={handleDeviceTypeChange}></SelectCycle>
          <SmallTitle>
            개인정보 수집 동의<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <ScrollableContent>
            <PrivacyAgreement>
              <h4>개인정보 수집 동의</h4>
              <p>[개인정보 수집 동의서]</p>
              <p>
                [수집하는 개인정보 항목] 1. 성명 2. 주소 3. 연락처 (전화번호,
                이메일) 4. 기초생활수급자 증명서 5. 대여기록 6. 결제 정보
                (계좌번호)
              </p>
              <p>
                [개인정보의 수집 및 이용 목적]
                <br />
                위에서 수집하는 개인정보는 다음과 같은 목적으로 이용됩니다.
                <br />
                1. 가입한 보험상품에 따른 서비스 제공 및 관리
                <br />
                2. 보험금 지급 및 관리
                <br />
                3. 서비스 개선 및 신규 서비스 제안
                <br />
                4. 법령 및 정부지침 준수 등
              </p>
              <p>
                [수집하는 개인정보 항목]
                <br />
                성명, 주민등록번호 또는 외국인 등록번호, 주소, 연락처, 이메일
                주소 등 직업, 건강 상태, 의료 기록 등 (보험 상품에 따라 다를 수
                있음)
              </p>
              <p>
                [개인정보의 보유 및 이용 기간]
                <br />
                보험 계약 종료 시까지 또는 법령에 따른 보유 기간 동안
              </p>
              <p>
                [동의 거부 권리 및 불이익 안내]
                <br />본 동의를 거부할 권리가 있으며, 그러나 필요한 최소한의
                정보를 수집하지 못할 경우 보험 가입이 제한될 수 있습니다.
              </p>
              <p>
                [개인정보의 파기]
                <br />
                보험 계약 종료 후 법령에 따라 정한 기간 이내에 파기되며, 그 외의
                용도로 사용되지 않습니다.
              </p>
              <p>
                [동의 철회]
                <br />
                개인정보 수집 및 이용에 대한 동의는 언제든지 철회 가능하며, 철회
                시 보험상품 이용이 제한될 수 있습니다.
              </p>
            </PrivacyAgreement>
          </ScrollableContent>
          <DownWrapper>
            <StyledCheckbox
              type='checkbox'
              checked={isCheckboxChecked}
              onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
            />
            <Agree>동의합니다</Agree>
          </DownWrapper>
          <Link to={'/'}>
            <SubmitButton
              type='button'
              disabled={!isFormComplete}
              onClick={handleSubmit}>
              작성 완료
            </SubmitButton>
          </Link>
        </Form>
      </Container>
    </Container>
  );
}

export default Apply;
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
  height: 590px;
  box-shadow: 0px 4px 30px 3px rgba(70, 76, 255, 0.1);
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
