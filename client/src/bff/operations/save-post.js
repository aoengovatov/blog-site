import { updatePost, addPost } from "../api";
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

    const savedPost =
        newPostData.id === ""
            ? await addPost(newPostData)
            : await updatePost(newPostData);

    return {
        error: null,
        res: savedPost,
    };
};
