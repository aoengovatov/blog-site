import { Input, Icon } from "../../../../components";
import styled from "styled-components";

const SearchContainer = ({ className }) => {
    return (
        <div className={className}>
            <Input />
            <Icon id="fa-search" margin="0 0 0 10px" size="20px" />
        </div>
    );
};

export const Search = styled(SearchContainer)`
    display: flex;
    margin: 25px auto 0;
    width: 340px;
    height: 40px;
    position: relative;

    & > div {
        position: absolute;
        right: 9px;
    }

    & > input {
        padding: 5px 30px 5px 8px;
    }
`;
