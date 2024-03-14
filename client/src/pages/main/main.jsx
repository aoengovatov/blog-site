import { useState, useEffect, useMemo } from "react";
import { PostCard, Pagination, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import { debounce } from "./utils";
import styled from "styled-components";
import { request } from "../../utils";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [searchPhrase, setSearchPhrase] = useState("");

    useEffect(() => {
        request(
            `/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
        ).then(({ data: { posts, lastPage } }) => {
            setPosts(posts);
            setLastPage(lastPage);
        });
    }, [page, shouldSearch]);

    const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

    const onSearch = ({ target }) => {
        setSearchPhrase(target.value);
        startDelayedSearch(!shouldSearch);
    };

    return (
        <div className={className}>
            <div className="posts-and-search">
                <Search searchPhrase={searchPhrase} onChange={onSearch} />
                {posts.length > 0 ? (
                    <div className="card-list">
                        {posts.map(({ id, title, imageUrl, publushedAt, comments }) => (
                            <PostCard
                                key={id}
                                id={id}
                                title={title}
                                imageUrl={imageUrl}
                                publushedAt={publushedAt}
                                commentsCount={comments.length}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="not-found-posts">Статьи не найдены</div>
                )}
            </div>

            {lastPage > 1 && posts.length > 0 && (
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

    & .not-found-posts {
        font-size: 18px;
        text-align: center;
        margin-top: 20px;
    }
`;
