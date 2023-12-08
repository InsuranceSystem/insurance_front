import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';

interface SelectStatusProps {
  value: string | null;
  onChange: (status: string | null) => void;
}

function SelectType({ value, onChange }: SelectStatusProps) {
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
    { value: '자동차', label: '자동차' },
    { value: '운전자', label: '운전자' },
    { value: '실손', label: '실손' },
    { value: '자녀', label: '자녀' },
    { value: '건강', label: '건강' },
    { value: '유병자', label: '유병자' },
    { value: '치아', label: '치아' },
    { value: '화재', label: '화재' },
    { value: '재산', label: '재산' },
    { value: '여행/레저', label: '여행/레저' },
    { value: '펫', label: '펫' }
  ];

  return (
    <StyledSelect
      options={Options}
      value={value ? { value, label: value } : null}
      onChange={handleCountChange}
      placeholder='유형 선택'
      styles={customStyles}
    />
  );
}

export default SelectType;

const StyledSelect = styled(Select)`
  width: 725px;
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
  margin-left: 30px;
  margin-bottom: 20px;
  margin-top: 10px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
