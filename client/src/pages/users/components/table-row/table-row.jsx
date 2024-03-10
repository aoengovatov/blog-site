import PropTypes from "prop-types";
import styled from "styled-components";

const TableRowContainer = ({ className, children }) => (
    <div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
    display: flex;

    & .user-container {
        display: flex;
        align-items: center;
        margin: 5px;
        border: 1px solid #000;
        border-radius: 6px;
    }

    & > div {
        padding: 0 10px;
    }

    & .login-column {
        width: 172px;
        padding-left: 5px;
    }

    & .registered-at-column {
        width: 213px;
    }

    & .role-column {
        display: flex;
        width: auto;
    }
`;

TableRow.propTypes = {
    children: PropTypes.node.isRequired,
};
