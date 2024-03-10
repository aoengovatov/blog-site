import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = ({ className, children, width, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const Button = styled(ButtonContainer)`
    font-size: 14px;
    padding: 7px 13px;
    background: #3465e3;
    width: ${({ width = "100%" }) => width};
    color: #f1e7e7;
    border: none;
    border-radius: 4px;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    transition: all 0.2s;

    &:hover {
        background: #1d4fcd;
    }

    &[disabled] {
        background-color: #cccccc;
        color: #666666;
    }
`;

Button.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.string,
};
