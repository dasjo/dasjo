import React from 'react';

import styled from '@emotion/styled';
import Entry from './Entry';

const SectionStyledEducation = styled.section``;

const SectionEducation = ({ education }: any) => (
  <SectionStyledEducation>
    <h2>Education</h2>
    {education.map((e: any, i: number) => (
      <Entry key={e.title + i} {...e} />
    ))}
  </SectionStyledEducation>
);

export default SectionEducation;
