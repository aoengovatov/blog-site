import { useServerRequest } from "../../hooks";
import { useState, useEffect } from "react";
import { PostCard } from "./components";
import styled from "styled-components";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const requestServer = useServerRequest();

    useEffect(() => {
        requestServer("fetchPosts").then((posts) => {
            if (posts.error) {
                return;
            }
            setPosts(posts.res);
        });
    }, [requestServer]);

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
        </div>
    );
};

export const Main = styled(MainContainer)`
    margin: 30px 20px;
    & .card-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
`;
