import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../../../components";

const RightAligned = styled.div`
    display: flex;
    justify-content: end;
`;

const Botton = styled.button`
    font-size: 16px;
    padding: 3px 10px;
    background: #fff;
    color: #000;
    border: none;
    border: 1px solid #000;
    border-radius: 3px;
    cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    return (
        <div className={className}>
            <RightAligned>
                <Link to="/login">
                    <Botton>Войти</Botton>
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
