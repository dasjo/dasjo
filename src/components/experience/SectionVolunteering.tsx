import React from 'react';

import styled from '@emotion/styled';
import Entry from './Entry';

const SectionStyledVolunteering = styled.section``;

const SectionVolunteering = ({ volunteering }: any) => (
  <SectionStyledVolunteering>
    <h2>Volunteering</h2>
    {volunteering.map((v: any, i: number) => (
      <Entry key={v.title + i} {...v} />
    ))}
  </SectionStyledVolunteering>
);

export default SectionVolunteering;
