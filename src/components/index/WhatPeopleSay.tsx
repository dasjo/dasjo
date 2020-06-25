import React from 'react';

import styled from '@emotion/styled';
import Saying, { SayingProps } from './Saying';

const StyledWhatPeopleSay = styled.section`
  background: var(--white);
  border-top: var(--border-light-1);
`;

const sayings: SayingProps[] = [
  {
    quote:
      'I have worked with Josef in various challenging agile projects. He stayed focused and he helped tremendously to keep the team spirit high and the client relationship trustful. He is very well connected in web, agile and Drupal communities and has a very up-to-date knowledge of the market and new practices. Therefore, I highly valued him for his forward looking and inspiring inputs he brought to agile and tech teams.',
    author:
      'Dagmar Muth, Client Relationships, Agile, Drupal, Community Engagement, Consulting',
  },
  {
    quote:
      'I worked closely together with Josef on pitches and the organization of community events. Josef is very passionate about his work and always puts a lot of power into his tasks. His network in the Drupal community and extensive experience with the Drupal technology contributed greatly to our success. The initiatives of Josef have helped our circle to become a stronger reputation in the Drupal community and to be visible for new potential talent. His skills are ranging from agile, Drupal, people management, consulting, sales, requirements engineering, writing.',
    author:
      'Dagmar Muth, Client Relationships, Agile, Drupal, Community Engagement, Consulting',
  },
];

const WhatPeopleSay = () => (
  <StyledWhatPeopleSay>
    <div className="row">
      <h2>What Others Say About Me</h2>
      <div className="sayings">
        {sayings.map((saying: SayingProps, i) => (
          <Saying key={i + saying.author} {...saying} />
        ))}
      </div>
    </div>
  </StyledWhatPeopleSay>
);

export default WhatPeopleSay;
