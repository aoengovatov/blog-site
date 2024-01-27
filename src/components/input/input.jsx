import styled from "styled-components";

export const InputContainer = ({ className, width, ...props }) => {
    return <input className={className} {...props} />;
};

export const Input = styled(InputContainer)`
    margin-bottom: 5px;
    width: ${({ width = "100%" }) => width};
    color: #000;
    font-size: 16px;
    background: #fff;
    border: 1px solid #000;
    padding: 4px 5px;
`;
