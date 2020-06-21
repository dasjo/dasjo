import React from "react";
import GlobalStyles from "../styles/GlobalStyles";
import styled from "@emotion/styled";

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
    <GlobalStyles />
    {children}
  </StyledRootLayout>
);

export default LayoutRoot;
