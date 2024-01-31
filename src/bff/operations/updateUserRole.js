import { setUserRole } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const updateUserRole = async (userSession, userId, newUserRole) => {
    const accessRoles = [ROLE.ADMIN];

    if (!sessions.access(userSession, accessRoles)) {
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
