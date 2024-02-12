import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { savePostAsync } from "../../../../actions";
import { useServerRequest } from "../../../../hooks";
import { Input, Icon } from "../../../../components";
import { PostPanel } from "../post-panel/post-panel";
import { sanitizeContent } from "./utils";
import styled from "styled-components";
import { PROP_TYPE } from "../../../../constants";

const PostFormContainer = ({
    className,
    post: { id, title, imageUrl, content, publushedAt },
}) => {
    const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
    const [titleValue, setTitleValue] = useState(title);
    const contentRef = useRef(null);
    const dispatch = useDispatch();
    const requestServer = useServerRequest();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        setImageUrlValue(imageUrl);
        setTitleValue(title);
    }, [title, imageUrl]);

    const onSave = () => {
        const newContent = sanitizeContent(contentRef.current.innerHTML);

        dispatch(
            savePostAsync(requestServer, {
                id,
                imageUrl: imageUrlValue,
                title: titleValue,
                content: newContent,
            })
        ).then(({ id }) => navigate(`/post/${id}`));
    };

    return (
        <div className={className}>
            <Input
                value={titleValue}
                placeholder="Заголовок"
                onChange={({ target }) => setTitleValue(target.value)}
            />
            <PostPanel
                id={id}
                publushedAt={publushedAt}
                editButton={<Icon id="fa-floppy-o" onClick={onSave} />}
            />
            <div className="post-content-container">
                <Input
                    value={imageUrlValue}
                    placeholder="Изображение"
                    onChange={({ target }) => setImageUrlValue(target.value)}
                />
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
        min-height: 80px;
        border: 2px solid #8c8888;
        border-radius: 5px;
        white-space: pre-line;
        transition: all 0.2s;
    }

    & .post-content:focus {
        outline: none;
        border-color: #3465e3;
    }
`;

PostForm.propTypes = {
    post: PROP_TYPE.POST.isRequired,
};
