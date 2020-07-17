import React from 'react';

import Saying, { SayingProps } from './Saying';

const WhatPeopleSay = ({ sayings, styles, rowClass }: any) => (
  <section style={{ ...styles }}>
    <div className={rowClass ? 'row' : ''}>
      <h2>What Others Say About Me</h2>
      <div className="sayings container--small">
        {sayings.map((saying: SayingProps, i: any) => (
          <Saying key={i + saying.person} {...saying} />
        ))}
      </div>
    </div>
  </section>
);

export default WhatPeopleSay;
