import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StyledFileInput from '../../Application/StyledFileInput';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SelectCycle from '../../../component/Selector/SelectCycle';

function Claim() {
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
        <Title>보상 청구</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Blank></Blank>
        </Form>
      </Container>
    </Container>
  );
}

export default Claim;
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
  height: 680px;
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
