import { useServerRequest } from "../../hooks";
import { useState, useEffect } from "react";
import { PostCard } from "./components";
import styled from "styled-components";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState(null);
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
            {posts.map(([id, title, publushedAt, commentCount]) => (
                <PostCard
                    key={id}
                    id={id}
                    title={title}
                    publushedAt={publushedAt}
                    commentCount={commentCount}
                />
            ))}
        </div>
    );
};

export const Main = styled(MainContainer)``;
