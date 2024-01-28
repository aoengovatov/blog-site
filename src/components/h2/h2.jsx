import styled from "styled-components";

const H2Container = ({ className, children }) => {
    return <h2 className={className}>{children}</h2>;
};

export const H2 = styled(H2Container)`
    margin-top: 25px;
    margin-bottom: 15px;
    color: #3465e3;
    font-size: 30px;
    font-weight: 600;
`;
