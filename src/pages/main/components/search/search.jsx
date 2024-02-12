import PropTypes from "prop-types";
import { Input, Icon } from "../../../../components";
import styled from "styled-components";

const SearchContainer = ({ className, searchPhrase, onChange }) => {
    return (
        <div className={className}>
            <Input
                value={searchPhrase}
                onChange={onChange}
                placeholder="поиск по заголовкам..."
            />
            <Icon id="fa-search" margin="0 0 0 10px" size="20px" />
        </div>
    );
};

export const Search = styled(SearchContainer)`
    display: flex;
    margin: 25px auto 0;
    width: 320px;
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

Search.PropTypes = {
    searchPhrase: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
