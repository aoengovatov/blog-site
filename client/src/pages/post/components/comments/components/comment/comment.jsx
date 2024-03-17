import PropTypes from "prop-types";
import { Icon } from "../../../../../../components";
import { removeCommentAsync } from "../../../../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { openModal, CLOSE_MODAL } from "../../../../../../actions";
import { selectUserRole } from "../../../../../../selectors";
import { ROLE } from "../../../../../../constants";
import { checkAccess } from "../../../../../../utils";
import styled from "styled-components";

const CommentContainer = ({ className, id, postId, author, content, publishedAt }) => {
    const dispatch = useDispatch();
    const userRole = useSelector(selectUserRole);

    const onDeleteComment = (id) => {
        dispatch(
            openModal({
                text: "Удалить комментарий?",
                onConfirn: () => {
                    dispatch(removeCommentAsync(id, postId));
                    dispatch(CLOSE_MODAL);
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            })
        );
    };

    const isAdminOrModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole);

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
            {isAdminOrModerator && (
                <Icon
                    onClick={() => onDeleteComment(id)}
                    id="fa-trash-o"
                    margin="0 0 0 10px"
                    size="22px"
                />
            )}
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

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
};
