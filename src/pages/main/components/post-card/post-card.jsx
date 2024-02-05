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
                    <h3>{title}</h3>
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
    border: 1px solid #000;
    margin-bottom: 20px;

    & .post-card-footer {
        padding: 8px;
        padding-top: 0;
    }

    & .post-content-image {
        width: 100%;
        height: 180px;
        margin-bottom: 8px;
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
