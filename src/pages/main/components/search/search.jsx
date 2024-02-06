import styled from "styled-components";

const SearchContainer = ({ className }) => {
    return (
        <div className={className}>
            <div className="serach-container">Поиск</div>
        </div>
    );
};

export const Search = styled(SearchContainer)`
    width: 100%;
    display: flex;

    & .serach-container {
        margin: 10px auto;
    }
`;
