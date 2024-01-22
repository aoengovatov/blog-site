import styled from "styled-components";

const Div = styled.div`
    text-align: center;
    color: red;
`;

export const App = () => {
    return (
        <>
            <i className="fa fa-comment-o"></i>
            <Div>123</Div>
        </>
    );
};
