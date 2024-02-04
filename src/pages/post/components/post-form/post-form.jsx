import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { savePostAsync } from "../../../../actions";
import { useServerRequest } from "../../../../hooks";
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
    const dispatch = useDispatch();
    const requestServer = useServerRequest();
    const navigate = useNavigate();

    const onSave = () => {
        const newImageUrl = imageRef.current.value;
        const newTitle = titleRef.current.value;
        const newContent = sanitizeContent(contentRef.current.innerHTML);

        dispatch(
            savePostAsync(requestServer, {
                id,
                imageUrl: newImageUrl,
                title: newTitle,
                content: newContent,
            })
        ).then(() => navigate(`/post/${id}`));
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
    margin-top: 30px;

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
