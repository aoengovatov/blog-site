import { Icon } from "../../../../components";
import { H2 } from "../../../../components";
import styled from "styled-components";

const PostContentContainer = ({
    className,
    post: { id, title, imageUrl, content, publushedAt },
}) => {
    return (
        <div className={className}>
            <H2>{title}</H2>
            <div className="post-attribut">
                <div className="date-icon">
                    <Icon id="fa-calendar-o" margin="0 10px 0 0" />
                    <div className="post_date">{publushedAt}</div>
                </div>
                <div className="post-edit-panel">
                    <div onClick={() => {}}>
                        <Icon id="fa-pencil-square-o" />
                    </div>
                    <div onClick={() => {}}>
                        <Icon id="fa-trash-o" margin="0 0 0 10px" />
                    </div>
                </div>
            </div>
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

    & .post-attribut {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }

    & .post-edit-panel {
        display: flex;
    }

    & .date-icon {
        display: flex;
        align-items: center;
    }

    & .post-content-image {
        width: 300px;
        margin: 0 12px 12px 0;
    }

    & .post-content {
        text-align: justify;
    }
`;
