import React, { memo } from "react";

const Tries = ({tryInfo}) => {
  const { value, result } = tryInfo;

  return (
    <li>
      {value}로 시도했고, {result}
    </li>
  );
};

export default memo(Tries);
