import React from "react";
import { Helmet } from "react-helmet";
const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
};

Meta.defaultProps={
title:"Welcome to T-Mart",
keywords:"cosmetics, kitchen items, fruits, vegetables, and everything",
description:"We sell best products in Ghorahi online"
}

export default Meta;
