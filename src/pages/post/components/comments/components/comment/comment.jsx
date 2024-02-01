import { Icon } from "../../../../../../components";
import styled from "styled-components";

const CommentContainer = ({ className, id, author, content, publishedAt }) => {
    return (
        <div className={className}>
            <div className="user-comment-container">
                <div className="top-comment-block">
                    <div className="author-comment-block">
                        <Icon id="fa-user-circle-o" margin="0 10px 0 0" size="20px" />
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
                <Icon id="fa-trash-o" margin="0 10px 0 0" size="20px" />
            </div>
        </div>
    );
};

export const Comment = styled(CommentContainer)`
    display: flex;
    width: 450px;
`;
