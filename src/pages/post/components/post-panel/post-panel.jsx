import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal, CLOSE_MODAL, removePostAsync } from "../../../../actions";
import { useServerRequest } from "../../../../hooks";
import { Icon } from "../../../../components";
import styled from "styled-components";

const PostPanelContainer = ({ className, id, publushedAt, editButton }) => {
    const dispatch = useDispatch();
    const requestServer = useServerRequest();
    const navigate = useNavigate();

    const onPostDelete = (id) => {
        dispatch(
            openModal({
                text: "Удалить статью?",
                onConfirn: () => {
                    dispatch(removePostAsync(requestServer, id)).then(() => {
                        navigate("/");
                    });
                    dispatch(CLOSE_MODAL);
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            })
        );
    };

    return (
        <div className={className}>
            <div className="date-icon">
                {publushedAt && <Icon id="fa-calendar-o" margin="0 10px 0 0" />}
                <div className="post_date">{publushedAt}</div>
            </div>
            <div className="post-edit-panel">
                {editButton}
                {publushedAt && (
                    <Icon
                        id="fa-trash-o"
                        margin="0 0 0 10px"
                        onClick={() => onPostDelete(id)}
                    />
                )}
            </div>
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
