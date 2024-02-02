import { Icon } from "../../../../components";
import { useState } from "react";
import { Comment } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../../../hooks";
import { addCommentAsync } from "../../../../actions";
import { selectUserId } from "../../../../selectors";
import styled from "styled-components";

const CommentsContainer = ({ className, comments, postId }) => {
    const [newComment, setNewComment] = useState("");
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();
    const serverRequest = useServerRequest();

    const onChangeComment = ({ target }) => {
        setNewComment(target.value);
    };

    const onNewCommentAdd = (userid, postId, content) => {
        dispatch(addCommentAsync(serverRequest, userId, postId, content));
    };

    return (
        <div className={className}>
            <div className="new-comment-container">
                <textarea
                    name="comment"
                    className="textarea-comment"
                    value={newComment}
                    placeholder="комментарий..."
                    onChange={(target) => onChangeComment(target)}
                ></textarea>
                <div
                    onClick={() => {
                        onNewCommentAdd(userId, postId, newComment);
                    }}
                >
                    <Icon id="fa-paper-plane-o" margin="0 0 0 10px" size="20px" />
                </div>
            </div>
            <div className="comments-list-container">
                {comments.map(({ id, author, content, publishedAt }) => (
                    <Comment
                        key={id}
                        id={id}
                        author={author}
                        content={content}
                        publishedAt={publishedAt}
                    />
                ))}
            </div>
        </div>
    );
};

export const Comments = styled(CommentsContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 450px;

    & .new-comment-container {
        display: flex;
    }

    & .textarea-comment {
        max-width: 450px;
        min-width: 450px;
        min-height: 100px;
        max-height: 100px;
        padding: 5px;
    }
`;
