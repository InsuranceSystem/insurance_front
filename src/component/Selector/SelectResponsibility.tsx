import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';

interface SelectStatusProps {
  value: boolean | null;
  onChange: (status: boolean) => void;
}

function SelectResponsibility({ value, onChange }: SelectStatusProps) {
  const [selectedCount, setSelectedCount] = useState<boolean | null>(null);
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
    const selectedValue = selectedOption.value; // Convert to string
    const attendingStatus = selectedValue === 'O'; // Convert to boolean
    setSelectedCount(attendingStatus);
    onChange(attendingStatus);
  };

  const Options = [
    { value: 'O', label: 'O' },
    { value: 'X', label: 'X' }
  ];
  const selectedValue = selectedCount ? 'O' : 'X';
  return (
    <StyledSelect
      options={Options}
      value={
        value !== null
          ? Options.find((option) => option.value === (value ? 'O' : 'X'))
          : null
      }
      onChange={handleCountChange}
      placeholder='배당 여부 선택'
      styles={customStyles}
    />
  );
}

export default SelectResponsibility;

const StyledSelect = styled(Select)`
  width: 715px;
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
  margin-left: 28px;
  margin-bottom: 20px;
  margin-top: 20px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
