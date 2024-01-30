import { authorize, register, logout, fetchUsers, fetchRoles } from "./operations";

export const server = {
    authorize,
    logout,
    register,
    fetchUsers,
    fetchRoles,
};
