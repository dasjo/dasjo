import React from "react";
import IndexLayout from "../layouts";
import Header from "../components/index/Header";
import WhatPeopleSay from "../components/index/WhatPeopleSay";

const IndexPage = () => (
  <IndexLayout>
    <>
      <Header />
      <WhatPeopleSay />
    </>
  </IndexLayout>
);

export default IndexPage;
