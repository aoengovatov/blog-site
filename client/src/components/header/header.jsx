import { Logo, ControlPanel } from "./components";
import styled from "styled-components";

const Description = styled.div`
    font-style: italic;
    color: #525252;
`;

const HeaderContainer = ({ className }) => (
    <header className={className}>
        <Logo />
        <Description>
            Веб-технологии
            <br />
            Написание кода
            <br />
            Разбор ошибок
        </Description>
        <ControlPanel />
    </header>
);

export const Header = styled(HeaderContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 1000px;
    top: 0;
    height: 120px;
    padding: 20px 40px;
    background-color: #fff;
    z-index: 10;
    box-shadow: 0px -2px 17px #555555;
`;
