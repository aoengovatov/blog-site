import { deleteUser } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const removeUser = async (hash, userId) => {
    const accessRoles = [ROLE.ADMIN];

    const assess = await sessions.access(hash, accessRoles);

    if (!assess) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }

    deleteUser(userId);

    return {
        error: null,
        res: true,
    };
};
