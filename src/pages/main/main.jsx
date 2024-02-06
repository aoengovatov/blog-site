import { useServerRequest } from "../../hooks";
import { useState, useEffect } from "react";
import { PostCard, Pagination } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import styled from "styled-components";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    const requestServer = useServerRequest();

    useEffect(() => {
        requestServer("fetchPosts", page, PAGINATION_LIMIT).then((posts) => {
            if (posts.error) {
                return;
            }
            setPosts(posts.res);
            console.log(page, PAGINATION_LIMIT, posts.res);
        });
    }, [requestServer, page]);

    return (
        <div className={className}>
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
            <Pagination page={page} setPage={setPage} />
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