import { Routes, Route } from "react-router-dom";
import { Header, Footer, Modal } from "./components";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";
import { Authrization, Registration, Users, Post } from "./pages";
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

const Page = styled.div`
    padding: 120px 0;
    margin: 0 20px;
`;

export const Blog = () => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const currentUserDataJSON = sessionStorage.getItem("userData");

        if (!currentUserDataJSON) {
            return;
        }

        const currentUserData = JSON.parse(currentUserDataJSON);

        dispatch(setUser({ ...currentUserData, roleId: currentUserData.roleId }));
    }, [dispatch]);

    return (
        <AppColumn>
            <Header />
            <Page>
                <Routes>
                    <Route path="/" element={<div>Главная станица</div>} />
                    <Route path="/login" element={<Authrization />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/post" element={<div>Новая статья</div>} />
                    <Route path="/post/:postId" element={<Post />} />
                    <Route path="/post/:postId/edit" element={<Post />} />
                    <Route path="*" element={<div>Ошибка</div>} />
                </Routes>
            </Page>
            <Footer />
            <Modal />
        </AppColumn>
    );
};
