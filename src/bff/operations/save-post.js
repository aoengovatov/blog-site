import { updatePost } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const savePost = async (hash, newPostData) => {
    const accessRoles = [ROLE.ADMIN];

    const assess = await sessions.access(hash, accessRoles);

    if (!assess) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }

    const updatedPost = await updatePost(newPostData);

    return {
        error: null,
        res: updatedPost,
    };
};
