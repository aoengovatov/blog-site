import { Icon } from "../../../../components";
import styled from "styled-components";

const PostContentContainer = ({
    className,
    id,
    title,
    image_url,
    content,
    publushedAt,
}) => {
    console.log(title);
    return (
        <div className={className}>
            <div className="post-title">{title}</div>
            <div className="post-attribut">
                <div className="date-icon">
                    <Icon id="fa-date-o" />
                    <div className="post_date">{publushed_at}</div>
                </div>
                <div className="post-edit-panel">
                    <Icon id="fa-edit-o" />
                    <Icon id="fa-trash-o" />
                </div>
            </div>
            <div className="post-content-container">
                <img src={image_url} alt={title}></img>
                <div className="post-content">{content}</div>
            </div>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    display: flex;
    flex-direction: column;
`;
