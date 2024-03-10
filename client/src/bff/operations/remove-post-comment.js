import { deleteComment, getPost } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";
import { getPostCommentsWithAuthor } from "../utils";

export const removePostComment = async (hash, id, postId) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

    const assess = await sessions.access(hash, accessRoles);

    if (!assess) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }

    await deleteComment(id);

    const post = await getPost(postId);

    const commentsWithAuthor = await getPostCommentsWithAuthor(postId);

    return {
        error: null,
        res: { ...post, comments: commentsWithAuthor },
    };
};