import styled from 'styled-components';

export const Wrapper = styled.aside`
  width: 500px;
  padding: 20px;
`;

export const PayMethodBox = styled.div`
  display: flex;
  justify-content: space-around;
`;


export const CashPayBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-left: 10px;
  gap: 0.479rem;
  width: 100%;
  height: 56px;
  color: white;
  background-color:  black;
  border-radius: 4px;
  padding: 0 1rem;
  border: none;
  cursor: pointer;
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-around;
`

export const GetDctBtn = styled.button`
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
`


export const CashPayBtnSmall = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
`


export const CardPayBtnSmall = styled.button`
  width: 80px;
  height: 30px;
  margin-left: 10px;
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
`
export const CardCouponPayBox = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 10px;
  border: 1px solid pink;
`

export const PayForCardBtn = styled.button`
  width: 160px;
  height: 30px;
  margin-left: 10px;
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
  
`

export const CashPaymentBox = styled.div`
 margin-top: 20px;
 border-bottom: 1px solid lightpink;
`