import { PostPanel } from "../post-panel/post-panel";
import { H2, Icon } from "../../../../components";
import styled from "styled-components";

const PostContentContainer = ({
    className,
    post: { id, title, imageUrl, content, publushedAt },
}) => {
    return (
        <div className={className}>
            <H2>{title}</H2>
            <PostPanel
                publushedAt={publushedAt}
                editButton={
                    <div onClick={() => {}}>
                        <Icon id="fa-pencil-square-o" />
                    </div>
                }
            />
            <div className="post-content-container">
                <img
                    className="post-content-image"
                    src={imageUrl}
                    alt={title}
                    align="left"
                ></img>
                <div className="post-content">{content}</div>
            </div>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    display: flex;
    flex-direction: column;
    width: 100%;

    & .post-content-image {
        width: 300px;
        margin: 0 12px 12px 0;
    }

    & .post-content {
        text-align: justify;
        margin-bottom: 20px;
        white-space: pre-line;
    }
`;
