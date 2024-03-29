import { Routes, Route } from "react-router-dom";
import { Error, Header, Footer, Modal } from "./components";
import { useLayoutEffect } from "react";
import { ERROR } from "./constants";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";
import { Authrization, Registration, Users, Post, Main } from "./pages";
import styled from "styled-components";

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: space-between;
    width: 1000px;
    min-height: 100%;
    margin: 0 auto;
    background-color: #fff;
`;

const Page = styled.div`
    padding: 120px 0 60px;
    margin: 0 20px;
    height: 100%;
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
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Authrization />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/post/:postId" element={<Post />} />
                    <Route path="/post/:postId/edit" element={<Post />} />
                    <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
                </Routes>
            </Page>
            <Footer />
            <Modal />
        </AppColumn>
    );
};
