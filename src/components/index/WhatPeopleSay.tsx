import React from 'react';

import styled from '@emotion/styled';
import Saying, { SayingProps } from './Saying';

const StyledWhatPeopleSay = styled.section`
  background: var(--white);
  border-top: var(--border-light-1);
`;

const WhatPeopleSay = ({ sayings }: any) => {
  console.log(sayings);
  return (
    <StyledWhatPeopleSay>
      <div className="row">
        <h2>What Others Say About Me</h2>
        <div className="sayings">
          {sayings.map((saying: SayingProps, i: any) => (
            <Saying key={i + saying.person} {...saying} />
          ))}
        </div>
      </div>
    </StyledWhatPeopleSay>
  );
};

export default WhatPeopleSay;
