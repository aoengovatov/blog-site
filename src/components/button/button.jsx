import styled from "styled-components";

const ButtonContainer = ({ className, children, width, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const Button = styled(ButtonContainer)`
    font-size: 16px;
    padding: 3px 10px;
    background: #fff;
    width: ${({ width = "100%" }) => width};
    color: #000;
    border: none;
    border: 1px solid #000;
    border-radius: 3px;
    cursor: pointer;
`;
