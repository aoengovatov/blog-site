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
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #1d4fcd;
    }
`;
