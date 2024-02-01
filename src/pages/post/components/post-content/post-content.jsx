import { Icon } from "../../../../components";
import styled from "styled-components";

const PostContentContainer = ({
    className,
    post: { id, title, imageUrl, content, publushedAt },
}) => {
    return (
        <div className={className}>
            <div className="post-title">{title}</div>
            <div className="post-attribut">
                <div className="date-icon">
                    <Icon id="fa-calendar-o" />
                    <div className="post_date">{publushedAt}</div>
                </div>
                <div className="post-edit-panel">
                    <Icon id="fa-pencil-square-o" />
                    <Icon id="fa-trash-o" margin="0 0 0 10px" />
                </div>
            </div>
            <div className="post-content-container">
                <img src={imageUrl} alt={title}></img>
                <div className="post-content">{content}</div>
            </div>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    display: flex;
    flex-direction: column;
    width: 100%;

    & .post-attribut {
        display: flex;
        justify-content: space-between;
    }

    & .post-edit-panel {
        display: flex;
    }
`;
