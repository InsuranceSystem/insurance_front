import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';

interface SelectStatusProps {
  onChange: (status: string) => void;
}

function SelectCycle({ onChange }: SelectStatusProps) {
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
    { value: '부', label: '부' },
    { value: '모', label: '모' },
    { value: '형제', label: '형제' },
    { value: '조부모', label: '조부모' },
    { value: '외조부모', label: '외조부모' },
    { value: '삼촌/이모', label: '삼촌/이모' }
  ];

  return (
    <StyledSelect
      options={Options}
      value={selectDevice ? { value: selectDevice, label: selectDevice } : null}
      onChange={handleCountChange}
      placeholder='가족관계 선택'
      styles={customStyles}
    />
  );
}

export default SelectCycle;

const StyledSelect = styled(Select)`
  width: 215px;
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
  margin-bottom: 20px;
  margin-top: 10px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
