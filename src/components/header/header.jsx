import styled from "styled-components";
import { Logo, ControlPanel } from "./components";

const Description = styled.div`
    font-style: italic;
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
    box-shadow: 0px -2px 17px #000;
`;
