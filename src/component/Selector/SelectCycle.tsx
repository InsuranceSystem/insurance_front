import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';

interface SelectStatusProps {
  onChange: (status: string | null) => void;
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
    { value: '월납', label: '월납' },
    { value: '분기납', label: '분기납' },
    { value: '반기납', label: '반기납' },
    { value: '연납', label: '연납' }
  ];

  return (
    <StyledSelect
      options={Options}
      value={selectDevice ? { value: selectDevice, label: selectDevice } : null}
      onChange={handleCountChange}
      placeholder='주기 선택'
      styles={customStyles}
    />
  );
}

export default SelectCycle;

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
