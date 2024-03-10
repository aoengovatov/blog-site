import { PrivateContent, H2 } from "../../components";
import { useServerRequest } from "../../hooks";
import { UserRow, TableRow } from "./components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkAccess } from "../../utils";
import { ROLE } from "../../constants";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";

const UsersContainer = ({ className }) => {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
    const requestServer = useServerRequest();
    const userRole = useSelector(selectUserRole);

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        }
        Promise.all([requestServer("fetchRoles"), requestServer("fetchUsers")]).then(
            ([rolesRes, usersRes]) => {
                if (usersRes.error || rolesRes.error) {
                    setErrorMessage(usersRes.error || rolesRes.error);
                    return;
                }
                setRoles(rolesRes.res);
                setUsers(usersRes.res);
            }
        );
    }, [requestServer, shouldUpdateUserList, userRole]);

    const onUserRemove = (userId) => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        }

        requestServer("removeUser", userId).then(() => {
            setShouldUpdateUserList(!shouldUpdateUserList);
        });
    };

    return (
        <div className={className}>
            <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
                <H2>Пользователи</H2>
                <div className="content-container">
                    <TableRow>
                        <div className="table-header">
                            <div className="login-column">логин</div>
                            <div className="registered-at-column">дата регистрации</div>
                            <div className="role-column">роль</div>
                        </div>
                    </TableRow>

                    {users.map(({ id, login, registedAt, roleId }) => (
                        <UserRow
                            key={id}
                            id={id}
                            login={login}
                            registedAt={registedAt}
                            roleId={roleId}
                            roles={roles.filter(
                                ({ id: roleId }) => roleId !== ROLE.GUEST
                            )}
                            onUserRemove={() => onUserRemove(id)}
                        />
                    ))}
                </div>
            </PrivateContent>
        </div>
    );
};

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 570px;

    & .content-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    & .table-header {
        display: flex;
        margin-left: 5px;
    }
`;
