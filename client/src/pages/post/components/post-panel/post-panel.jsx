import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal, CLOSE_MODAL, removePostAsync } from "../../../../actions";
import { Icon } from "../../../../components";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../selectors";
import { checkAccess } from "../../../../utils";
import styled from "styled-components";

const PostPanelContainer = ({ className, id, publishedAt, editButton }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRole = useSelector(selectUserRole);

    const onPostDelete = (id) => {
        dispatch(
            openModal({
                text: "Удалить статью?",
                onConfirn: () => {
                    dispatch(removePostAsync(id)).then(() => {
                        navigate("/");
                    });
                    dispatch(CLOSE_MODAL);
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            })
        );
    };

    const isAdmin = checkAccess([ROLE.ADMIN], userRole);

    return (
        <div className={className}>
            <div className="date-icon">
                {publishedAt && <Icon id="fa-calendar-o" margin="0 10px 0 0" />}
                <div className="post_date">{publishedAt}</div>
            </div>
            {isAdmin && (
                <div className="post-edit-panel">
                    {editButton}
                    {publishedAt && (
                        <Icon
                            id="fa-trash-o"
                            margin="0 0 0 10px"
                            onClick={() => onPostDelete(id)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export const PostPanel = styled(PostPanelContainer)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    & .post-edit-panel {
        display: flex;
    }

    & .date-icon {
        display: flex;
        align-items: center;
    }
`;

PostPanel.propTypes = {
    id: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    editButton: PropTypes.node.isRequired,
};
