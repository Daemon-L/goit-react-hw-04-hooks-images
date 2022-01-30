import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { Spinner } from './Loader.styled'

const Loader = () => {
  return (
    <Spinner>
      <BallTriangle heigth="50" width="50" color="blue" ariaLabel="loading" />
    </Spinner>
  );
};

export default Loader;