import React from 'react';
import BaseStyles from '../styles/BaseStyles';
import styled from '@emotion/styled';

const StyledRootLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

interface LayoutRootProps {
  children: JSX.Element;
}

const LayoutRoot = ({ children }: LayoutRootProps) => (
  <StyledRootLayout>
    <BaseStyles />
    {children}
  </StyledRootLayout>
);

export default LayoutRoot;
