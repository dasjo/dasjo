import React from 'react';

import styled from '@emotion/styled';
import Entry from './Entry';

const SectionStyledWork = styled.section``;

const SectionWork = ({ work }: any) => (
  <SectionStyledWork>
    <h2>Work</h2>
    {work.map((w: any, i: number) => (
      <Entry key={w.title + i} {...w} />
    ))}
  </SectionStyledWork>
);

export default SectionWork;
