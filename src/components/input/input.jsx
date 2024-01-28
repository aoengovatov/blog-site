import { forwardRef } from "react";
import styled from "styled-components";

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
    return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
    margin-bottom: 5px;
    width: ${({ width = "100%" }) => width};
    color: #312e2e;
    font-size: 16px;
    background: #fff;
    border: 2px solid #8c8888;
    border-radius: 5px;
    padding: 5px 8px;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #3465e3;
    }
`;
