import React from 'react';

import styled from '@emotion/styled';
import Saying, { SayingProps } from './Saying';

const StyledWhatPeopleSay = styled.section`
  background: var(--white-0);
  border-top: var(--border-light-1);
`;

const WhatPeopleSay = ({ sayings }: any) => (
  <StyledWhatPeopleSay>
    <div className="row">
      <h2>What Others Say About Me</h2>
      <div className="sayings container--small">
        {sayings.map((saying: SayingProps, i: any) => (
          <Saying key={i + saying.person} {...saying} />
        ))}
      </div>
    </div>
  </StyledWhatPeopleSay>
);

export default WhatPeopleSay;
