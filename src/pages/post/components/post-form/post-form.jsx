import { Input, Icon } from "../../../../components";
import { PostPanel } from "../post-panel/post-panel";
import styled from "styled-components";

const PostFormContainer = ({
    className,
    post: { id, title, imageUrl, content, publushedAt },
}) => {
    return (
        <div className={className}>
            <Input defaultValue={title} />
            <PostPanel
                publushedAt={publushedAt}
                editButton={
                    <div onClick={() => {}}>
                        <Icon id="fa-floppy-o" />
                    </div>
                }
            />
            <div className="post-content-container">
                <Input defaultValue={imageUrl} />
                <div
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="post-content"
                >
                    {content}
                </div>
            </div>
        </div>
    );
};

export const PostForm = styled(PostFormContainer)`
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
