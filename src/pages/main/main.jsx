import { useServerRequest } from "../../hooks";
import { useState, useEffect } from "react";
import { PostCard, Pagination, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import { debounce } from "./utils";
import styled from "styled-components";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [searchPhrase, setSearchPhrase] = useState("");

    const requestServer = useServerRequest();

    useEffect(() => {
        requestServer("fetchPosts", searchPhrase, page, PAGINATION_LIMIT).then(
            (posts) => {
                if (posts.error) {
                    return;
                }
                setPosts(posts.res.postData);
                setLastPage(posts.res.lastPage);
            }
        );
    }, [requestServer, page, shouldSearch]);

    const startDelayedSearch = debounce(setShouldSearch, 2000);

    const onSearch = ({ target }) => {
        setSearchPhrase(target.value);
        startDelayedSearch(!shouldSearch);
    };

    return (
        <div className={className}>
            <Search searchPhrase={searchPhrase} onChange={onSearch} />
            <div className="card-list">
                {posts.map(({ id, title, imageUrl, publushedAt, commentsCount }) => (
                    <PostCard
                        key={id}
                        id={id}
                        title={title}
                        imageUrl={imageUrl}
                        publushedAt={publushedAt}
                        commentsCount={commentsCount}
                    />
                ))}
            </div>
            {lastPage > 1 && (
                <Pagination page={page} lastPage={lastPage} setPage={setPage} />
            )}
        </div>
    );
};

export const Main = styled(MainContainer)`
    margin: 20px 0;

    & .card-list {
        display: flex;
        flex-wrap: wrap;
    }
`;
