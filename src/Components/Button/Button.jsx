import React from "react";
import PropTypes from "prop-types";
import { LoadButton } from './Button.styled';

const LoadMoreButton = ({ onClick }) => {
    return (
        <LoadButton type="button" onClick={onClick}>
            Load more
        </LoadButton>
    );
};

LoadMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired
};
export default LoadMoreButton;