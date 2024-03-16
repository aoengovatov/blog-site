import PropTypes from "prop-types";
import { Icon } from "../../../../components";
import { useState } from "react";
import { Comment } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { addCommentAsync } from "../../../../actions";
import { selectUserRole } from "../../../../selectors";
import styled from "styled-components";
import { checkAccess } from "../../../../utils";
import { PROP_TYPE, ROLE } from "../../../../constants";

const CommentsContainer = ({ className, comments, postId }) => {
    const [newComment, setNewComment] = useState("");
    const userRole = useSelector(selectUserRole);
    const dispatch = useDispatch();

    const onNewCommentAdd = (postId, content) => {
        if (content !== "") {
            dispatch(addCommentAsync(postId, content));
        }
        setNewComment("");
    };

    const isGuest = checkAccess([ROLE.GUEST], userRole);

    return (
        <div className={className}>
            {!isGuest && (
                <div className="new-comment-container">
                    <textarea
                        name="comment"
                        className="textarea-comment"
                        value={newComment}
                        placeholder="комментарий..."
                        onChange={({ target }) => setNewComment(target.value)}
                    ></textarea>

                    <Icon
                        onClick={() => onNewCommentAdd(postId, newComment)}
                        id="fa-paper-plane-o"
                        margin="0 0 0 10px"
                        size="20px"
                    />
                </div>
            )}

            <div className="comments-list-container">
                {comments.map(({ id, author, content, publishedAt }) => (
                    <Comment
                        key={id}
                        id={id}
                        postId={postId}
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
    /*align-items: center;*/
    width: 500px;

    & .new-comment-container {
        display: flex;
    }

    & .textarea-comment {
        max-width: 450px;
        min-width: 450px;
        min-height: 100px;
        max-height: 100px;
        padding: 5px;
        margin-bottom: 10px;
    }
`;

Comments.propTypes = {
    comments: PropTypes.arrayOf(PROP_TYPE.COMMENT),
    postId: PropTypes.string.isRequired,
};
