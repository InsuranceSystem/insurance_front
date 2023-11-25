import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';

interface SelectStatusProps {
  onChange: (status: string | null) => void;
}

function SelectDevice({ onChange }: SelectStatusProps) {
  const [selectDevice, setSelectDevice] = useState<string | null>('');
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: 'none',
      borderRadius: '10px',
      background: provided.background,
      cursor: 'pointer'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    singleValue: (provided) => ({
      ...provided,
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    })
  };
  const handleCountChange = (selectedOption: any) => {
    setSelectDevice(selectedOption.value);
    onChange(selectedOption.value);
  };

  const Options = [
    { value: '회사원', label: '회사원' },
    { value: '전문직 종사', label: '전문직 종사' },
    { value: '교사/교수', label: '교사/교수' },
    { value: '가정주부', label: '가정주부' },
    { value: '학생', label: '학생' },
    { value: '프리랜서', label: '프리랜서' },
    { value: '자영업자', label: '자영업자' },
    { value: '예술가', label: '예술가' },
    { value: '기타', label: '기타' }
  ];

  return (
    <StyledSelect
      options={Options}
      value={selectDevice ? { value: selectDevice, label: selectDevice } : null}
      onChange={handleCountChange}
      placeholder='직업 선택'
      styles={customStyles}
    />
  );
}

export default SelectDevice;

const StyledSelect = styled(Select)`
  width: 238px;
  height: 36px;
  padding: 0px;
  flex-shrink: 0;
  appearance: none;
  border: none;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 6px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
