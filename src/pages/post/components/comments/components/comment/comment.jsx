import { Icon } from "../../../../../../components";
import styled from "styled-components";

const CommentContainer = ({ className, id, author, content, publishedAt }) => {
    return (
        <div className={className}>
            <div className="user-comment-container">
                <div className="top-comment-block">
                    <div className="author-comment-block">
                        <Icon id="fa-user-circle-o" margin="0 10px 0 0" size="22px" />
                        <div className="author-name">{author}</div>
                    </div>
                    <div className="date-comment-block">
                        <Icon id="fa-calendar-o" margin="0 10px 0 0" size="20px" />
                        <div className="date-comment">{publishedAt}</div>
                    </div>
                </div>
                <div className="content-comment">{content}</div>
            </div>
            <div onClick={() => {}}>
                <Icon id="fa-trash-o" margin="0 0 0 10px" size="22px" />
            </div>
        </div>
    );
};

export const Comment = styled(CommentContainer)`
    display: flex;
    margin-bottom: 10px;

    & .user-comment-container {
        border: 1px solid #000;
        padding: 5px 12px;
        width: 450px;
    }

    & .top-comment-block {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }

    & .author-comment-block {
        display: flex;
        align-items: center;
    }

    & .date-comment-block {
        display: flex;
        align-items: center;
    }

    & .content-comment {
        margin-bottom: 5px;
    }
`;
