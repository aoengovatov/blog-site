import { addComment, getPost, getComments } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const addPostComment = async (hash, userId, postId, content) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

    const assess = await sessions.access(hash, accessRoles);

    if (!assess) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }

    await addComment(userId, postId, content);

    const post = await getPost(postId);

    const comments = await getComments(postId);

    return {
        error: null,
        res: { ...post, comments },
    };
};
