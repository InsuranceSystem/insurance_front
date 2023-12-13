import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import recycleBin from '../../assets/recycleBin.svg';
import plusButton from '../../assets/addButton.svg';
import calender_icon from '../../assets/calendar-star.svg';
import box from '../../assets/box.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FamilyHistoryProps } from '../../component/Props/FamilyHistoryProps';
import SelectRelationship from '../../component/Selector/SelectRelationship';
import SelectGender from '../../component/Selector/SelectGender';
import SelectJob from '../../component/Selector/SelectJob';
import { useNavigate } from 'react-router-dom';
declare global {
  interface Window {
    daum: any; // Daum 우편번호 서비스 API 객체의 타입 정의
  }
}
function SignUp() {
  const navigate = useNavigate();
  const [containerHeight, setContainerHeight] = useState<string>('59rem');
  const [id, setId] = useState<string>('');
  const [isIdValid, setIsIdValid] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [specificAddress, setSpecificAddress] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birth, setBirth] = useState<Date | null>(null);
  const [informationAgreement, setInformationAgreement] =
    useState<boolean>(false);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleIdCheck = () => {
    setContainerHeight('66rem');

    const userId = {
      id: id
    };
    setIsIdValid(true);
    // axios
    //   .post('/api/ckech/id', userId)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log('Id check successful:', response);
    //       setIsIdValid(true);
    //       alert('인증되었습니다.');
    //     } else {
    //       console.log('Id check failed:', response);
    //       setIsIdValid(false);
    //       alert('코드가 다릅니다. 재전송 후 다시 확인해주세요');
    //     }
    //   })
    //   .catch((error) => {
    //     alert('인증 과정에서 에러가 발생했습니다.');
    //     setIsIdValid(false);
    //   });
  };

  // 비밀번호 시작
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleGenderChange = (gender: string | null) => {
    setGender(gender || '');
  };
  const handleJobChange = (Job: string | null) => {
    setJob(Job || '');
  };
  const handleBirthChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더해줍니다.
      const day = date.getDate();
      const formattedDate = `${year}-${month}-${day}`;

      // yyyy-mm-dd 형식의 문자열을 Date 객체로 변환
      const parsedDate = new Date(formattedDate);
      setBirth(parsedDate);
    } else {
      // 예외 처리: 날짜가 null인 경우 처리
      // 예를 들어, 유효한 날짜를 입력하지 않은 경우 처리할 내용을 작성할 수 있습니다.
    }
  };
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  const handleSpecificAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpecificAddress(event.target.value);
    //주소 뒤에 상세 주소 이어 붙이는 작업 구현
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
  const handleSearchAddress = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //주소 검색 로직
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          setAddress(data.address);
        }
      }).open();
    } else {
      console.error('Daum Postcode API not loaded.');
    }
  };
  const handleInformationAgreementChange: React.ChangeEventHandler<
    HTMLInputElement
  > = () => {
    setInformationAgreement(!informationAgreement);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  // 가입하기
  const handleClick = async (event: FormEvent) => {
    event.preventDefault();
    const formattedBirth = birth ? birth.toISOString().substr(0, 10) : ''; // birth가 null이 아닌 경우에만 변환 작업을 수행하고, null인 경우 빈 문자열을 반환합니다.

    const dto = {
      loginId: id,
      password: password,
      name: name,
      job: job,
      gender: gender,
      birth: formattedBirth,
      phoneNumber: phone,
      address: address + ' ' + specificAddress,
      familyHistoryList: familyHistoryList
    };
    const formData = new FormData();
    formData.append(
      'dto',
      new Blob([JSON.stringify(dto)], { type: 'application/json' })
    );
    console.log(dto);
    if (isIdValid) {
      if (password === confirmPassword) {
        setPasswordsMatch(true);
        if (
          id &&
          password &&
          confirmPassword &&
          name &&
          phone &&
          job &&
          gender &&
          birth &&
          informationAgreement
        ) {
          axios
            .post(
              '/api/customers/join',
              dto, // 직접 JSON 객체를 전달합니다.
              {
                headers: {
                  'Content-Type': 'application/json' // 요청 헤더에 Content-Type 설정
                }
              }
            )
            .then((response) => {
              console.log(response);
              if (response.status === 201) {
                alert('회원가입 성공');
                navigate('/');
              } else {
                alert('회원가입 실패');
              }
            })
            .catch((err) => {
              console.log(err);
              alert('회원가입에 실패하였습니다. 다시 시도해주세요');
            });
        } else {
          alert('필수 입력 사항을 모두 확인해주세요');
        }
      } else {
        setPasswordsMatch(false);
        alert('비밀번호가 일치하지 않습니다.');
      }
    } else {
      alert('아이디 중복 확인을 진행해주세요');
    }
  };
  const [familyHistoryList, setFamilyHistoryList] = useState<
    FamilyHistoryProps[]
  >([]);
  const handleAddFamilyHistory = () => {
    const newFamilyHistory: FamilyHistoryProps = {
      diseaseName: '',
      relationship: ''
    };
    const updatedFamilyHistory = [...familyHistoryList, newFamilyHistory];
    setFamilyHistoryList(updatedFamilyHistory);
  };
  const handleDiseaseNameChange = (index: number, diseaseName: string) => {
    const updatedFamilyHistory = [...familyHistoryList];
    updatedFamilyHistory[index].diseaseName = diseaseName;
    setFamilyHistoryList(updatedFamilyHistory);
  };
  const handleRelationshipChange = (index: number, relationship: string) => {
    const updatedFamilyHistory = [...familyHistoryList];
    updatedFamilyHistory[index].relationship = relationship;
    setFamilyHistoryList(updatedFamilyHistory);
  };
  const handleDeleteFamilyHistory = (index: number) => {
    const updatedFamilyHistory = [...familyHistoryList];
    updatedFamilyHistory.splice(index, 1); // Remove the question at the specified index
    setFamilyHistoryList(updatedFamilyHistory);
  };
  useEffect(() => {
    const familyHistoryHeight = familyHistoryList.length * 8; // 120은 FamilyHistoryContainer의 높이

    const totalHeight = 65 + familyHistoryHeight; // 59는 초기 높이
    setContainerHeight(`${totalHeight}rem`);
  }, [familyHistoryList]);
  return (
    <Wrapper>
      <ButtonWrapper>
        <QuestionAddBtn onClick={handleAddFamilyHistory}>
          <img src={plusButton} />
        </QuestionAddBtn>
        <img src={box} />
      </ButtonWrapper>
      <SignUpForm onSubmit={handleSubmit}>
        <SignUpContainer style={{ height: containerHeight }}>
          <InputContainer>
            <InputTitle>계정 설정</InputTitle>
            <AccountSettingContainer>
              <TextContainer>
                <InputText>아이디</InputText>
                <RedAsterisk>*</RedAsterisk>
              </TextContainer>
              <StyledInput
                id='name'
                type='text'
                value={id}
                placeholder='아이디 입력'
                onChange={handleEmailChange}
              />
              <VerifyButton onClick={handleIdCheck}>
                {isIdValid ? '확인 완료' : '중복 확인'}
              </VerifyButton>
            </AccountSettingContainer>
            <AccountSettingContainer>
              <TextContainer>
                <InputText>비밀번호</InputText>
                <RedAsterisk>*</RedAsterisk>
              </TextContainer>
              <PasswordInput
                type='password'
                name='password'
                value={password}
                placeholder='비밀번호 입력'
                onChange={handlePasswordChange}
              />
            </AccountSettingContainer>
            <AccountSettingContainer>
              <TextContainer>
                <InputText>비밀번호 재입력</InputText>
                <RedAsterisk>*</RedAsterisk>
              </TextContainer>
              <PasswordInput
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                placeholder='비밀번호 재입력'
                onChange={handleConfirmPasswordChange}
              />
              {!passwordsMatch && (
                <PasswordWarning>비밀번호를 확인해주세요!</PasswordWarning>
              )}
            </AccountSettingContainer>
          </InputContainer>
          <InputContainer>
            <InputTitle>기본 정보 기입</InputTitle>
            <ProfileSettingContainer>
              <OuterContainer>
                <InnerContainer>
                  <InputText>이름</InputText>
                  <RedAsterisk>*</RedAsterisk>
                </InnerContainer>
                <ProfileInput
                  type='text'
                  name='name'
                  value={name}
                  placeholder='홍길동'
                  onChange={handleNameChange}
                />
              </OuterContainer>
              <OuterContainer>
                <InnerContainer>
                  <InputText>전화번호</InputText>
                  <RedAsterisk>*</RedAsterisk>
                </InnerContainer>
                <ProfileInput
                  type='text'
                  name='phone'
                  value={phone}
                  placeholder='하이픈 없이 입력해주세요'
                  onChange={handlePhoneChange}
                />
              </OuterContainer>
            </ProfileSettingContainer>
            <ProfileSettingContainer>
              <OuterContainer>
                <InnerContainer>
                  <InputText>직업</InputText>
                  <RedAsterisk>*</RedAsterisk>
                </InnerContainer>
                <SelectJob
                  onChange={(job: string | null) =>
                    handleJobChange(job || 'default value')
                  }></SelectJob>
              </OuterContainer>
              <OuterContainer>
                <InnerContainer>
                  <InputText>성별</InputText>
                  <RedAsterisk>*</RedAsterisk>
                </InnerContainer>
                <SelectGender
                  onChange={(gender: string | null) =>
                    handleGenderChange(gender || 'default value')
                  }></SelectGender>
              </OuterContainer>
            </ProfileSettingContainer>
            <ProfileSettingContainer>
              <OuterContainer>
                <InnerContainer>
                  <InputText>생년월일</InputText>
                  <RedAsterisk>*</RedAsterisk>
                </InnerContainer>
                <SelectedDate
                  selected={birth}
                  onChange={handleBirthChange}
                  dateFormat='yyyy-MM-dd'
                />
              </OuterContainer>
              <OuterContainer />
            </ProfileSettingContainer>
            <ProfileSettingContainer>
              <OuterContainer>
                <InnerContainer>
                  <InputText>주소</InputText>
                </InnerContainer>
                <AddressWrapper>
                  <Introduction
                    type='text'
                    name='address'
                    value={address}
                    placeholder='도로명 주소'
                    onChange={handleAddressChange}
                  />
                  <AddressButton onClick={handleSearchAddress}>
                    검색
                  </AddressButton>
                </AddressWrapper>
                <Introduction
                  id='name'
                  type='text'
                  value={specificAddress}
                  placeholder='상세 주소'
                  onChange={handleSpecificAddressChange}
                />
              </OuterContainer>
              <OuterContainer />
            </ProfileSettingContainer>
          </InputContainer>
          <InputContainer>
            <InputTitle>가족력 등록</InputTitle>
            <Container>
              {familyHistoryList.map((familyHistory, index) => (
                <FamilyHistoryContainer>
                  <InnerContainer key={index}>
                    <SelectRelationship
                      onChange={(relationship: string | null) =>
                        handleRelationshipChange(
                          index,
                          relationship || 'default value'
                        )
                      }
                    />
                    <QuestionTitleInput
                      name={`questionTitle_${index}`}
                      type='text'
                      placeholder='질환명을 작성해주세요.'
                      value={familyHistory.diseaseName}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleDiseaseNameChange(index, event.target.value)
                      }
                    />
                    <Recycle
                      src={recycleBin}
                      onClick={() => handleDeleteFamilyHistory(index)} // Call delete function on click
                    />
                  </InnerContainer>
                </FamilyHistoryContainer>
              ))}
            </Container>
          </InputContainer>
          <CheckboxContainer>
            <CheckboxLabel>
              <Checkbox
                type='checkbox'
                checked={informationAgreement}
                onChange={handleInformationAgreementChange}
              />
              <CheckboxText>개인정보 수집 및 이용에 동의합니다.</CheckboxText>
            </CheckboxLabel>
          </CheckboxContainer>
          <VerifyButton onClick={handleClick} disabled={!informationAgreement}>
            가입하기
          </VerifyButton>
        </SignUpContainer>
      </SignUpForm>
    </Wrapper>
  );
}

export default SignUp;
const SelectedDate = styled(DatePicker)`
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
  margin-top: 0.5rem;
  dateformat: yyyy-MM-dd;
  background-image: url(${calender_icon});
  background-size: 17px;
  background-repeat: no-repeat;
  background-position: calc(100% - 7px) center;
  outline: none;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  top: 550px;
  left: 1250px;
  display: flex;
  flex-direction: row;
`;
const AddressWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Recycle = styled.img`
  width: 25px;
  height: 25px;
  margin-bottom: 8px;
  margin-left: 12px;
  border-radius: 0.3125rem;
`;
const AddressButton = styled.button`
  font-family: 'GmarketSansMedium';
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  width: 104px;
  height: 40px;
  line-height: 30px;
  border-radius: 15px;
  background: rgba(0, 47, 213, 0.05);
  color: #002fd5;
  border: none;
  margin-left: 10px;
  margin-top: 5px;
  &:hover:not([disabled]) {
    background-color: #002fd5;
    color: #ffffff;
  }

  &:active {
    color: #002fd5;
  }
`;
const FamilyHistoryContainer = styled.div`
  width: 520px;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.3125rem;
  border-top: 0.1px solid #32a9eb;
  border-right: 0.1px solid #32a9eb;
  border-bottom: 0.1px solid #32a9eb;
  border-left: 5px solid #32a9eb;
  padding: 0.7rem;
  margin-bottom: 13px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`;
const TitleInput = styled.input`
  width: 100%;
  height: 1.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-family: GmarketSansLight;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  outline: none;
  border: none;
  border-bottom: 0.5px solid #dddddd;
`;
const QuestionTitleInput = styled(TitleInput)`
  width: 150px;
  margin-left: 30px;
  margin-right: 50px;
  outline: none;
`;
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignUpForm = styled.form`
  height: auto;
  margin-top: 50px;
`;
const QuestionAddBtn = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 4px;
`;

const SignUpContainer = styled.div`
  width: 40rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 1.25rem;
  border: 1px solid #dbdbdf;
  background: #ffffff;
  margin-top: 60px;
`;

const InputContainer = styled.div`
  width: 35rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border: none;
  border-bottom: 1px solid #dddddd;
`;
const Container = styled.div`
  width: 35rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border: none;
`;
const InputTitle = styled.span`
  color: rgba(0, 0, 0, 0.7);
  font-family: GmarketSansMedium;
  font-size: 1.125rem;
  font-style: normal;
  line-height: normal;
`;

const InputText = styled.span`
  display: flex;
  height: 1rem;
  flex-direction: column;
  float: left;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  font-family: GmarketSansMedium;
  font-size: 0.875rem;
  font-style: normal;
  line-height: normal;
`;

const VerifyButton = styled.button`
  font-family: 'GmarketSansMedium';
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  width: 104px;
  height: 40px;
  line-height: 30px;
  border-radius: 15px;
  background: rgba(0, 47, 213, 0.05);
  color: #002fd5;
  border: none;
  margin-left: 10px;
  /* 활성화된 버튼 스타일 */
  &:hover:not([disabled]) {
    background-color: #002fd5;
    color: #ffffff;
  }

  /* 비활성화된 버튼 스타일 */
  &:disabled {
    pointer-events: none; /* 이벤트 비활성화 */
    opacity: 0.5; /* 비활성화 시 투명도 조정 (선택사항) */
  }

  &:active {
    color: #002fd5;
  }
`;
const RedAsterisk = styled(InputText)`
  color: red;
`;

const TextContainer = styled.div`
  width: 6.625rem;
  height: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AccountSettingContainer = styled.div`
  width: 35rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`;

const StyledInput = styled.input`
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
  margin-left: 1.5rem;
  padding-left: 0.5rem;
`;

const PasswordInput = styled.input`
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
  margin-left: 1.5rem;
  padding-left: 0.5rem;
`;

const PasswordWarning = styled.p`
  color: #ff6347;
  font-family: GmarketSansMedium;
  font-size: 0.875rem;
  font-style: normal;
  line-height: normal;
  margin-left: 0.8rem;
`;

const ProfileSettingContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 0.8rem;
`;
const OuterContainer = styled.div`
  width: 18rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
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
  margin-top: 0.5rem;
`;

const Introduction = styled.input`
  width: 400px;
  height: 2rem;
  border-radius: 0.625rem;
  border: 1px solid #dbdbdf;
  background: #fff;
  color: rgba(0, 0, 0, 0.7);
  font-family: GmarketSansLight;
  font-size: 0.875rem;
  font-style: normal;
  line-height: normal;
  padding-left: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxContainer = styled.div`
  width: 35rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 1rem;
`;

const CheckboxLabel = styled.label`
  width: 20rem;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Checkbox = styled.input`
  width: 0.9375rem;
  height: 0.9375rem;
  flex-shrink: 0;
  border-radius: 0.1875rem;
  border: 1px solid #dbdbdf;
  background: #ffffff;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #32a9eb;
  }
`;

const CheckboxText = styled.span`
  color: rgba(0, 0, 0, 0.6);
  font-family: GmarketSansMedium;
  font-size: 0.75rem;
  font-style: normal;
  line-height: normal;
  margin-left: 0.3rem;
`;
