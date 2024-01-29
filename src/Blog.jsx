import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Authrization, Registration, Users } from "./pages";
import styled from "styled-components";

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1000px;
    min-height: 100%;
    margin: 0 auto;
    background-color: #fff;
`;

const Content = styled.div`
    padding: 120px 0;
    margin: 0 20px;
`;

export const Blog = () => {
    return (
        <AppColumn>
            <Header />
            <Content>
                <Routes>
                    <Route path="/" element={<div>Главная станица</div>} />
                    <Route path="/login" element={<Authrization />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/post" element={<div>Новая статья</div>} />
                    <Route path="/post/:postId" element={<div>Статья</div>} />
                    <Route path="*" element={<div>Ошибка</div>} />
                </Routes>
            </Content>
            <Footer />
        </AppColumn>
    );
};
