import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useServerRequest } from "../../hooks";
import { Comments, PostContent } from "./components";
import { loadPostAsync } from "../../actions";
import { selectPost } from "../../selectors";
import styled from "styled-components";

const PostContainer = ({ className }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const requestServer = useServerRequest();
    const post = useSelector(selectPost);

    useEffect(() => {
        dispatch(loadPostAsync(requestServer, params.postId));
    }, [dispatch, requestServer, params.postId]);

    return (
        <div className={className}>
            <PostContent post={post} />
            <Comments comments={post.comments} />
        </div>
    );
};

export const Post = styled(PostContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 40px 20px 40px;
`;
