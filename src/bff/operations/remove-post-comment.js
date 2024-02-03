import { deleteComment, getPost, getComments, getUsers } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

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

    const comments = await getComments(postId);

    const users = await getUsers();

    const commentsWithAuthor = comments.map((comment) => {
        const user = users.find(({ id }) => id === comment.authorId);
        return {
            ...comment,
            author: user?.login,
        };
    });

    return {
        error: null,
        res: { ...post, comments: commentsWithAuthor },
    };
};
