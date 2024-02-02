import { getRoles } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const fetchRoles = async (hash) => {
    const accessRoles = [ROLE.ADMIN];

    const assess = await sessions.access(hash, accessRoles);

    if (!assess) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }

    const roles = await getRoles();

    return {
        error: null,
        res: roles,
    };
};
