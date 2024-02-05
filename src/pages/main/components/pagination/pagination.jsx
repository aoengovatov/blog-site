import { Button } from "../../../../components";
import styled from "styled-components";

const PaginationContainer = ({ className, page, setPage }) => {
    return (
        <div className={className}>
            <Button
                onClick={() => {
                    setPage(1);
                }}
            >
                В начало
            </Button>
            <Button
                onClick={() => {
                    setPage(page - 1);
                }}
            >
                Предыдущая
            </Button>
            <div className="current-page">Страница: {page}</div>
            <Button
                onClick={() => {
                    setPage(page + 1);
                }}
            >
                Следующая
            </Button>
            <Button
                onClick={() => {
                    setPage(1);
                }}
            >
                В конец
            </Button>
        </div>
    );
};

export const Pagination = styled(PaginationContainer)`
    display: flex;
    justify-content: center;
    margin: 10px 0;
    padding: 35px;

    & button {
        margin: 5px;
    }

    & .current-page {
        border: 1px solid #000;
        width: 100%;
        height: 40px;
        text-align: center;
    }
`;
