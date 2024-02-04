import { Icon } from "../../../../components";
import styled from "styled-components";

const PostPanelContainer = ({ className, publushedAt, editButton }) => {
    return (
        <div className={className}>
            <div className="date-icon">
                <Icon id="fa-calendar-o" margin="0 10px 0 0" />
                <div className="post_date">{publushedAt}</div>
            </div>
            <div className="post-edit-panel">
                {editButton}
                <div onClick={() => {}}>
                    <Icon id="fa-trash-o" margin="0 0 0 10px" />
                </div>
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
