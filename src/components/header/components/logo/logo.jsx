import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../../../components";

const LargeText = styled.div`
    font-size: 48px;
    font-weight: 600;
    line-height: 48px;
    margin-top: 20px;
    color: #3465e3;
`;

const SmallText = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: #767575;
    margin-top: 5px;
`;

const LogoContainer = ({ className }) => {
    return (
        <Link className={className} to="/">
            <Icon id="fa-code" size="70px" margin="0 10px 0 0" />
            <div>
                <LargeText>Blog</LargeText>
                <SmallText>web-developer</SmallText>
            </div>
        </Link>
    );
};

export const Logo = styled(LogoContainer)`
    display: flex;
    margin-top: -18px;
`;
