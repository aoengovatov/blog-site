import { Icon } from "../../../../components";
import { useState } from "react";
import { Comment } from "./components";
import styled from "styled-components";

const CommentsContainer = ({ className, comments }) => {
    const [newComment, setNewComment] = useState("");

    const onChangeComment = ({ target }) => {
        setNewComment(target.value);
    };

    return (
        <div className={className}>
            <div className="new-comment-container">
                <textarea
                    className="textarea-comment"
                    value={newComment}
                    placeholder="комментарий..."
                    onChange={(target) => onChangeComment(target)}
                ></textarea>
                <div onClick={() => {}}>
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
