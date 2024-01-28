import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = ({ className }) => {
    const [sity, setSity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [weather, setWeather] = useState("");

    useEffect(() => {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=Samara&units=metric&lang=ru&appid=0105d023ded7a71bfb6a0f75651026fd"
        )
            .then((response) => response.json())
            .then(({ name, main, weather }) => {
                setSity(name);
                setTemperature(Math.round(main.temp));
                setWeather(weather[0].description);
            });
    }, []);

    const RightSideBlock = styled.div`
        text-align: right;
    `;

    return (
        <div className={className}>
            <div>
                <div>Блог веб-разработчика</div>
                <div>web@developer.ru</div>
            </div>
            <RightSideBlock>
                <div>
                    {sity},{" "}
                    {new Date().toLocaleString("ru", { day: "numeric", month: "long" })}
                </div>
                <div>
                    {temperature} градусов, {weather}
                </div>
            </RightSideBlock>
        </div>
    );
};

export const Footer = styled(FooterContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: #fff;
    width: 1000px;
    padding: 20px 40px;
    background-color: #143370;
    box-shadow: 0px 2px 17px #555555;
`;
