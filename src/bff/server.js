import { getUser } from "./get-user";
import { addUser } from "./add-user";
import { sessions } from "./sessions";
import { createSession } from "./create-session";

export const server = {
    async authorize(authLogin, authPassword) {
        const user = getUser(authLogin);

        if (!user) {
            return {
                error: "Такой пользователь не найден",
                res: null,
            };
        }

        if (authPassword !== user.password) {
            return {
                error: "Неверный пароль",
                res: null,
            };
        }

        return {
            error: null,
            res: {
                id: user.id,
                login: user.login,
                role_id: user.role_id,
                session: sessions.create(user),
            },
        };
    },
    async register(regLogin, regPassword) {
        const user = getUser(regLogin);

        if (user) {
            return {
                error: "Такой логин уже занят",
                res: null,
            };
        }

        addUser(regLogin, regPassword);

        return {
            error: null,
            res: {
                id: user.id,
                login: user.login,
                role_id: user.role_id,
                session: sessions.create(user),
            },
        };
    },
};
