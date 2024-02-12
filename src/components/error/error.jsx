import { H2 } from "../h2/h2";

import styled from "styled-components";
import { PROP_TYPE } from "../../constants";

const ErrorContainer = ({ className, error }) =>
    error && (
        <div className={className}>
            <H2>Ошибка</H2>
            <div>{error}</div>
        </div>
    );

export const Error = styled(ErrorContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

Error.PropTypes = {
    error: PROP_TYPE.ERROR,
};
