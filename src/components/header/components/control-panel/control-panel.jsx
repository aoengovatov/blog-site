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
    return (
        <div className={className}>
            <RightAligned>
                <Botton>Войти</Botton>
            </RightAligned>
            <RightAligned>
                <Icon id="fa-backward" margin="5px 0 0 0" />
                <Icon id="fa-file-text-o" margin="5px 0 0 15px" />
                <Icon id="fa-users" margin="5px 0 0 15px" />
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)``;
