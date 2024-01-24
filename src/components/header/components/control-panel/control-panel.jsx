import styled from "styled-components";

const RightAligned = styled.div`
    display: flex;
    justify-content: end;
`;

const ControlPanelContainer = ({ className }) => {
    return (
        <div className={className}>
            <RightAligned>
                <button>Войти</button>
            </RightAligned>
            <RightAligned>
                <button></button>
                <button></button>
                <button></button>
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)``;
