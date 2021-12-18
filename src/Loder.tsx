import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const LoadingBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.2rem;
  width: 2.2rem;
  height: 2rem;
`;

const Span = styled.div`
  color: white;
  outline: none;
`;

interface LoaderProps {
  type: any;
  color: string;
  message: string;
}
const Loader = ({ type, color, message }: LoaderProps): React.ReactElement => {
  console.log(type, 'type? ');
  return (
    <>
      <LoadingBox>
        <Span>{message}</Span>
        <ReactLoading type={type} color={color} height="70%" width="70%" />
      </LoadingBox>
    </>
  );
};
export default Loader;
