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

const RightAligned = styled.div`
    display: flex;
    justify-content: end;
`;

const UserLogin = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);
    const session = useSelector(selectUserSession);

    return (
        <div className={className}>
            <RightAligned>
                {roleId === ROLE.GUEST ? (
                    <>
                        <Link to="/login">
                            <Button>Войти</Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <UserLogin>{login}</UserLogin>
                        <div onClick={() => dispatch(logout(session))}>
                            <Icon id="fa-sign-out" margin="5px 0 0 15px" />
                        </div>
                    </>
                )}
            </RightAligned>
            <RightAligned>
                <div onClick={() => navigate(-1)}>
                    <Icon id="fa-backward" margin="5px 0 0 0" />
                </div>
                <Link to="/post">
                    <Icon id="fa-file-text-o" margin="5px 0 0 15px" />
                </Link>
                <Link to="/users">
                    <Icon id="fa-users" margin="5px 0 0 15px" />
                </Link>
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)``;
