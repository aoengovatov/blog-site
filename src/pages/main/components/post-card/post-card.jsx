import { Icon } from "../../../../components";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostCardContainer = ({
    className,
    id,
    title,
    imageUrl,
    publushedAt,
    commentsCount,
}) => {
    return (
        <div className={className}>
            <Link to={`/post/${id}`}>
                <img className="post-content-image" src={imageUrl} alt={title}></img>
                <div className="post-card-footer">
                    <h3 className="post-title">{title}</h3>
                    <div className="post-card-info">
                        <div className="date-block">
                            <Icon id="fa-calendar-o" margin="0 10px 0 0" />
                            <div className="post_date">{publushedAt}</div>
                        </div>
                        <div className="comment-block">
                            <Icon id="fa-comment-o" margin="0 10px 0 0" />
                            <div className="post-comments">{commentsCount}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export const PostCard = styled(PostCardContainer)`
    display: flex;
    flex-direction: column;
    width: 280px;
    background-color: #ededed;
    margin: 20px;
    border-radius: 5px;
    overflow: hidden;
    border: 2px solid transparent;
    transition: all 0.2s;

    &:hover {
        border-color: #dddddd;
    }

    & .post-title {
        font-size: 17px;
        color: #3465e3;
    }

    & .post-card-footer {
        padding: 10px;
        padding-top: 0;
    }

    & .post-content-image {
        width: 100%;
        height: 160px;
        margin-bottom: 3px;
    }

    & .date-block {
        display: flex;
        align-items: center;
    }

    & .comment-block {
        display: flex;
        align-items: center;
    }

    & .post-card-info {
        display: flex;
        justify-content: space-between;
    }
`;
