import { Content, H2 } from "../../components";
import { useServerRequest } from "../../hooks";
import { UserRow, TableRow } from "./components";
import { useEffect, useState } from "react";
import styled from "styled-components";

const UsersContainer = ({ className }) => {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const requestServer = useServerRequest();

    useEffect(() => {
        Promise.all([requestServer("fetchRoles"), requestServer("fetchUsers")]).then(
            ([rolesRes, usersRes]) => {
                if (usersRes.error || rolesRes.error) {
                    setErrorMessage(usersRes.error || rolesRes.error);
                    return;
                }
                setRoles(rolesRes);
                setUsers(usersRes);
            }
        );
    }, [requestServer]);

    return (
        <div className={className}>
            <Content error={errorMessage}>
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
                        roles={roles}
                    />
                ))}
            </Content>
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
