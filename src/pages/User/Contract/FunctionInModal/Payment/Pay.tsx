import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { PaymentProps } from '../../../../../component/Props/Payment';
import { useLocation } from 'react-router-dom';

function Pay() {
  const location = useLocation();
  const state = location.state;
  const idFromState = state?.id;
  const [payData, setPayData] = useState<PaymentProps[]>([]);
  const [forceRefresh, setForceRefresh] = useState(false);
  const handleForceRefresh = () => {
    setForceRefresh((prevState) => !prevState); // 상태 변경으로 하위 컴포넌트 리렌더링 유도
  };
  useEffect(() => {
    console.log(idFromState);
    axios
      .get(`/api/payments/${idFromState}`)
      .then((response) => {
        if (response.data.data) {
          setPayData(response.data.data);
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  }, [forceRefresh]);
  const handlePayClick = (id: string) => {
    const idNum = Number(id);
    axios
      .post(`/api/payments/${idNum}/update`)
      .then((response) => {
        console.log(response);
        alert('납입 완료되었습니다.');
        handleForceRefresh();
      })
      .catch((error) => {
        console.error('Error fetching group data:', error);
      });
  };
  const handleAlreadyPayClick = () => {
    alert('이미 납부된 내역입니다.');
  };
  return (
    <Container>
      <Container>
        <Title>납입내역</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <TableContainer>
            <thead>
              <tr>
                <TableHeader>날짜</TableHeader>
                <TableHeader>보험료</TableHeader>
                <TableHeader>버튼</TableHeader>
              </tr>
            </thead>
            <tbody>
              {payData.map(
                ({ id, stringDateOfPayment, premium, whetherPayment }) => (
                  <TableRow key={id}>
                    <TableCell>{stringDateOfPayment}</TableCell>
                    <TableCell>{premium}원</TableCell>
                    <TableCell>
                      <ActionButtons>
                        {whetherPayment ? (
                          <>
                            <ApproveButton
                              onClick={() => handleAlreadyPayClick()}>
                              납입 완료
                            </ApproveButton>
                          </>
                        ) : (
                          <>
                            <RejectButton
                              disabled={whetherPayment}
                              onClick={() => handlePayClick(id)}>
                              납입
                            </RejectButton>
                          </>
                        )}
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                )
              )}
            </tbody>
          </TableContainer>
        </Form>
      </Container>
    </Container>
  );
}

export default Pay;
const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: center;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

const ApproveButton = styled.button`
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: #e8f9ff;
  color: #008fd5;
  font-weight: 500;
  border: none;
  cursor: pointer;
  border-radius: 10px;
`;

const RejectButton = styled.button`
  padding: 5px 10px;
  background-color: #ffd1d1;
  color: #ff0000;
  font-weight: 500;
  border: none;
  cursor: pointer;
  border-radius: 10px;
`;
const Title = styled.div`
  margin-top: 60px;
  font-size: 30px;
  margin-bottom: 10px;
  margin-right: 680px;
  font-family: 'GmarketSansMedium';
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
  height: 590px;
  border: 2px solid #dbdbdf;
  margin-bottom: 50px;
  margin-left: 8px;
  margin-top: 30px;
`;
