import PropTypes from "prop-types";
import { Icon } from "../../../../components";
import { useState } from "react";
import { TableRow } from "../table-row/table-row";
import styled from "styled-components";
import { PROP_TYPE } from "../../../../constants";
import { request } from "../../../../utils";

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

    const onRoleChange = ({ target }) => {
        setSelectedRoleId(Number(target.value));
    };

    const onRoleSave = (userId, newUserRoleId) => {
        request(`/users/${userId}`, "PATCH", { roleId: newUserRoleId }).then(() => {
            setInitialRoleId(newUserRoleId);
        });
    };

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

UserRow.propTypes = {
    id: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    registedAt: PropTypes.string.isRequired,
    roleId: PROP_TYPE.ROLE_ID.isRequired,
    roles: PropTypes.arrayOf(PROP_TYPE.ROLE.isRequired).isRequired,
    onUserRemove: PropTypes.func.isRequired,
};
