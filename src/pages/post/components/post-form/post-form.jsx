import { useRef } from "react";
import { Input, Icon } from "../../../../components";
import { PostPanel } from "../post-panel/post-panel";
import { sanitizeContent } from "./utils";
import styled from "styled-components";

const PostFormContainer = ({
    className,
    post: { id, title, imageUrl, content, publushedAt },
}) => {
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const onSave = () => {
        const newImageUrl = imageRef.current.value;
        const newTitle = titleRef.current.value;
        const newContent = sanitizeContent(contentRef.current.innerHTML);

        console.log(newImageUrl, newTitle, newContent);
    };
    return (
        <div className={className}>
            <Input ref={titleRef} defaultValue={title} plaсeholder="Заголовок" />
            <PostPanel
                publushedAt={publushedAt}
                editButton={
                    <div onClick={onSave}>
                        <Icon id="fa-floppy-o" />
                    </div>
                }
            />
            <div className="post-content-container">
                <Input ref={imageRef} defaultValue={imageUrl} plaсeholder="Изображение" />
                <div
                    ref={contentRef}
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
