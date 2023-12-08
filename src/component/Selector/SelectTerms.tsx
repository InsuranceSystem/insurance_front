import React, { useEffect, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import styled from 'styled-components';
import { TermsProps } from '../Props/TermsProps';
import axios from 'axios';

interface RelatedTagsSelectProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}
const MultiCustomStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    boxShadow: 'none',
    background: provided.background,
    cursor: 'pointer'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  singleValue: (provided: any) => ({
    ...provided,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }),
  multiValue: (base: any, state: any) => ({
    ...base,
    borderRadius: '10px',
    border: '0.8px solid #858585',
    background: 'rgba(255, 255, 255, 0.05)'
  }),
  multiValueLabel: (base: any, state: any) => ({
    ...base,
    color: 'rgba(0, 0, 0, 0.95)', // 선택된 태그 텍스트 색상 변경
    fontFamily: 'GmarketSansMedium'
  })
};
const CustomSelect = styled(Select)`
  width: 710px;
  height: 36px;
  margin-right: 10px;
  margin-left: 36px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  font-size: 12.6px;
  .react-select__multi-value {
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 2px 6px;
    margin: 2px;
  }

  .react-select__multi-value__label {
    color: rgba(0, 0, 0, 0.95);
  }
`;

const RelatedTagsSelect = ({
  selectedTags,
  onChange
}: RelatedTagsSelectProps) => {
  const [options, setOptions] = useState<TermsProps[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<TermsProps[]>([]);

  useEffect(() => {
    axios
      .get(
        'https://port-0-insurancesystem-euegqv2blnzmormf.sel5.cloudtype.app/terms'
      )
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          // API에서 받아온 데이터를 value와 label로 매핑하여 options 상태에 저장
          const formattedOptions = response.data.data.map(
            (term: TermsProps) => ({
              value: term.termsID,
              label: term.termsName
            })
          );
          setOptions(formattedOptions);
        } else {
          console.error(
            'ApplyInsurance list data not available:',
            response.data
          );
        }
      })
      .catch((error) => {
        console.error('Error fetching application history:', error);
      });
  }, []);

  useEffect(() => {
    const matchedOptions = options.filter(
      (option: any) => selectedTags.includes(option.value) // 'termsID' 대신 'value' 사용
    );
    //setSelectedOptions(matchedOptions);
  }, [options, selectedTags]);

  const handleSelectChange = (
    selectedOptions: any,
    actionMeta: ActionMeta<any>
  ) => {
    setSelectedOptions(selectedOptions);
    const selectedValues = selectedOptions.map((option: any) => option.value); // 'termsID' 값만 저장
    onChange(selectedValues);
  };
  return (
    <CustomSelect
      isMulti
      value={selectedOptions} // 선택된 옵션들을 'value' prop에 설정
      onChange={handleSelectChange}
      options={options}
      placeholder='약관을 선택해주세요'
      styles={MultiCustomStyles}
    />
  );
};

export default RelatedTagsSelect;
