import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useServerRequest } from "../../hooks";
import { Error } from "../../components";
import { Comments, PostContent, PostForm } from "./components";
import { loadPostAsync, RESET_POST_DATA } from "../../actions";
import { selectPost } from "../../selectors";
import styled from "styled-components";

const PostContainer = ({ className }) => {
    const [error, setError] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const params = useParams();
    const isEditing = useMatch("/post/:postId/edit");
    const isCreating = useMatch("/post");
    const requestServer = useServerRequest();
    const post = useSelector(selectPost);

    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA);
    }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            setIsLoading(false);
            return;
        }

        dispatch(loadPostAsync(requestServer, params.postId)).then((postData) => {
            setError(postData.error);
            setIsLoading(false);
        });
    }, [dispatch, requestServer, params.postId, isCreating]);

    if (isLoading) {
        return null;
    }

    return error ? (
        <Error error={error} />
    ) : (
        <div className={className}>
            {isCreating || isEditing ? (
                <PostForm post={post} />
            ) : (
                <>
                    <PostContent post={post} />
                    <Comments comments={post.comments} postId={post.id} />
                </>
            )}
        </div>
    );
};

export const Post = styled(PostContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 40px 20px 40px;
`;
