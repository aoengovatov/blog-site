import { H2 } from "../../components";
import { UserRow, TableRow } from "./components";
import styled from "styled-components";

const UsersContainer = ({ className }) => {
    const users = [];

    return (
        <div className={className}>
            <H2>Пользователи</H2>
            <TableRow>
                <div className="login-column">логин</div>
                <div className="registered-at-column">дата регистрации</div>
                <div className="role-column">роль</div>
            </TableRow>

            {users.map(({ id, login, registredAt, roleId }) => (
                <UserRow
                    key={id}
                    login={login}
                    registeredAt={registredAt}
                    roleId={roleId}
                />
            ))}
        </div>
    );
};

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 570px;
`;
