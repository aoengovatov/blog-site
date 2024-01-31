import { Icon } from "../../../../components";
import { useState } from "react";
//import { useDispatch } from "react-redux";
import { TableRow } from "../table-row/table-row";
import { useServerRequest } from "../../../../hooks";
import styled from "styled-components";

const UserRowContainer = ({
    className,
    id,
    login,
    registedAt,
    roleId: userRoleId,
    roles,
    onUserRemove,
}) => {
    const [initialRoleId, setInitialRoleId] = useState(userRoleId);
    const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
    //const dispatch = useDispatch();
    const requestServer = useServerRequest();

    const onRoleChange = ({ target }) => {
        setSelectedRoleId(Number(target.value));
    };

    const onRoleSave = (userId, newUserRoleId) => {
        requestServer("updateUserRole", userId, newUserRoleId).then(() => {
            console.log("сохранить роль");
            setInitialRoleId(newUserRoleId);
        });
    };

    console.log(roles);

    const isSaveButtonDisabled = selectedRoleId === initialRoleId;

    return (
        <div className={className}>
            <TableRow>
                <div className="user-container">
                    <div className="login-column">{login}</div>
                    <div className="registered-at-column">{registedAt}</div>
                    <div className="role-column">
                        <select
                            value={selectedRoleId}
                            onChange={(target) => onRoleChange(target)}
                        >
                            {roles.map(({ id: roleId, name: roleName }) => (
                                <option key={roleId} value={roleId}>
                                    {roleName}
                                </option>
                            ))}
                        </select>
                        <div onClick={() => onRoleSave(id, selectedRoleId)}>
                            <Icon
                                id="fa-floppy-o"
                                disabled={isSaveButtonDisabled}
                                margin="0 0 0 10px"
                            />
                        </div>
                    </div>
                </div>
            </TableRow>
            <div onClick={onUserRemove}>
                <Icon id="fa-trash-o" margin="0 0 0 5px" />
            </div>
        </div>
    );
};

export const UserRow = styled(UserRowContainer)`
    display: flex;
    align-items: center;
`;
