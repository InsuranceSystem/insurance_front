import React, { Children } from 'react';
import styled from 'styled-components';
import close from '../../assets/close.svg';

interface ModalProps {
  closeModal: () => void;
  width: string;
  height: string;
  header: string;
  description: string;
  children: React.ReactNode;
}

const Modal = ({
  closeModal,
  width,
  height,
  header,
  children,
  description
}: ModalProps) => {
  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent
        onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
        width={width}
        height={height}>
        <ModalHeader>{header}</ModalHeader>
        <ModalDescription>{description}</ModalDescription>
        {children}
        <CloseButton onClick={closeModal}>
          <CloseButtonImg src={close} alt='close ' />
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div<{ width: string; height: string }>`
  background-color: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: ${(props) => props.width};
  width: 100%;
  height: ${(props) => props.height};
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  color: #000;
  font-family: 'GmarketSansMedium';
  font-size: 1.3925rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 1rem;
`;

const ModalDescription = styled.div`
  color: #000;
  font-size: 0.7375rem;
  font-family: 'GmarketSansLight';
  font-weight: 300;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.01);
    transition: all 0.3s ease-in-out;
  }
`;

const CloseButtonImg = styled.img`
  width: 1.875rem;
  height: 1.875rem;
`;
