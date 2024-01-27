import { Link, useNavigate } from "react-router-dom";
import { Icon, Button } from "../../../../components";
import styled from "styled-components";

const RightAligned = styled.div`
    display: flex;
    justify-content: end;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    return (
        <div className={className}>
            <RightAligned>
                <Link to="/login">
                    <Button>Войти</Button>
                </Link>
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
