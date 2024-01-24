import styled from "styled-components";
import { Icon } from "../../../../components";

const LargeText = styled.div`
    font-size: 48px;
    font-weight: 600;
    line-height: 48px;
    margin-top: 22px;
`;

const SmallText = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const LogoContainer = ({ className }) => {
    return (
        <div className={className}>
            <Icon id="fa-code" size="70px" margin="0 10px 0 0" />
            <div>
                <LargeText>Блог</LargeText>
                <SmallText>веб-разработчика</SmallText>
            </div>
        </div>
    );
};

export const Logo = styled(LogoContainer)`
    display: flex;
    margin-top: -20px;
`;
