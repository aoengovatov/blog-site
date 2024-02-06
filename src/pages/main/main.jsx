import { useServerRequest } from "../../hooks";
import { useState, useEffect } from "react";
import { PostCard, Pagination, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import styled from "styled-components";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const requestServer = useServerRequest();

    useEffect(() => {
        requestServer("fetchPosts", page, PAGINATION_LIMIT).then((posts) => {
            if (posts.error) {
                return;
            }
            setPosts(posts.res.postData);
            setLastPage(posts.res.lastPage);
        });
    }, [requestServer, page]);

    return (
        <div className={className}>
            <Search />
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
