import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    selectUserRole,
    selectUserLogin,
    selectUserSession,
} from "../../../../selectors";
import { Icon, Button } from "../../../../components";
import { ROLE } from "../../../../constants";
import { logout } from "../../../../actions";
import styled from "styled-components";

const RightAlignedIcons = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 7px;
`;

const RightAlignedLogin = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
`;

const UserLogin = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #3465e3;
    text-transform: uppercase;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);
    const session = useSelector(selectUserSession);

    return (
        <div className={className}>
            <RightAlignedLogin>
                {roleId === ROLE.GUEST ? (
                    <>
                        <Link to="/login">
                            <Button>войти</Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <UserLogin>{login}</UserLogin>
                        <div onClick={() => dispatch(logout(session))}>
                            <Icon id="fa-sign-out" margin="0 0 0 10px" />
                        </div>
                    </>
                )}
            </RightAlignedLogin>
            <RightAlignedIcons>
                <div onClick={() => navigate(-1)}>
                    <Icon id="fa-backward" margin="0 0 0 0" />
                </div>
                <Link to="/post">
                    <Icon id="fa-file-text-o" margin="0 0 0 15px" />
                </Link>
                <Link to="/users">
                    <Icon id="fa-users" margin="0 0 0 15px" />
                </Link>
            </RightAlignedIcons>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)``;
