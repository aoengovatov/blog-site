import { deletePost } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const removePost = async (hash, id) => {
    const accessRoles = [ROLE.ADMIN];

    const assess = await sessions.access(hash, accessRoles);

    if (!assess) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }

    await deletePost(id);

    return {
        error: null,
        res: true,
    };
};
