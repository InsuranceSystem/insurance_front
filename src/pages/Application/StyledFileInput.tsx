import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px; /* Adjust the height */
  width: 720px;
  margin-left: 30px;
  margin-bottom: 20px; /* Add margin to separate from other elements */
  margin-top: 10px;
`;

const UploadName = styled.div`
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 15px; /* Apply border-radius */
  font-size: 15px;
  color: #999999;
  flex: 1; /* Take remaining space */
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-family: 'GmarketSansMedium';
  width: 100px;
  height: 41px;
  margin-left: 5px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background: #428aff;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 43.5px;
  letter-spacing: -2px;
  cursor: pointer;

  &:hover {
    background-color: #0461e5;
  }
`;

const Input = styled.input`
  position: absolute;
  width: 100px;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

interface StyledFileInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function StyledFileInput({ onChange }: StyledFileInputProps) {
  const [selectedFileName, setSelectedFileName] = useState(''); // State for selected file name

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName('');
    }
    onChange(event);
  };

  return (
    <FileInputContainer>
      <UploadName>
        <span>{selectedFileName || 'pdf,jpg,jpeg,png 가능'}</span>
      </UploadName>
      <Label>
        파일 선택
        <Input
          type='file'
          accept='.pdf,.jpg, .jpeg, .png'
          onChange={handleFileChange} // Use the modified event handler
        />
      </Label>
    </FileInputContainer>
  );
}

export default StyledFileInput;
