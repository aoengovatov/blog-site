import { setUserRole } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const updateUserRole = async (hash, userId, newUserRole) => {
    const accessRoles = [ROLE.ADMIN];

    const assess = await sessions.access(hash, accessRoles);

    if (!assess) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }

    setUserRole(userId, newUserRole);

    return {
        error: null,
        res: true,
    };
};
