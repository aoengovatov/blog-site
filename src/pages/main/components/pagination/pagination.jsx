import { Button } from "../../../../components";
import styled from "styled-components";

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
    return (
        <div className={className}>
            <Button
                disabled={page === 1}
                onClick={() => {
                    setPage(1);
                }}
            >
                в начало
            </Button>
            <Button
                disabled={page === 1}
                onClick={() => {
                    setPage(page - 1);
                }}
            >
                пред.
            </Button>
            <div className="current-page">стр: {page}</div>
            <Button
                disabled={page === lastPage}
                onClick={() => {
                    setPage(page + 1);
                }}
            >
                след.
            </Button>
            <Button
                disabled={page === lastPage}
                onClick={() => {
                    setPage(lastPage);
                }}
            >
                в конец
            </Button>
        </div>
    );
};

export const Pagination = styled(PaginationContainer)`
    display: flex;
    justify-content: center;
    margin: 10px 0;

    & button {
        margin: 5px;
        width: 100px;
    }

    & .current-page {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #dbdbdb;
        height: 30px;
        text-align: center;
        font-size: 14px;
        padding: 7px 13px;
        border-radius: 3px;
        margin: 5px;
    }
`;
