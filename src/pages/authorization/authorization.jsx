import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { useState } from "react";
import styled from "styled-components";

const authFormShema = yup.object().shape({
    login: yup
        .string()
        .required("Заполните логин.")
        .matches(/\w+$/, "ННеверно заполнен логин. Допускаются буквы и цифры.")
        .min(3, "Неверно заполнен логин. Минимум 3 символа.")
        .max(15, "Неверно заполнен логин. Максимум 15 символов."),
    password: yup
        .string()
        .required("Заполните пароль")
        .matches(
            /^[\w#%]+$/,
            "Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %"
        )
        .min(6, "Неверно заполнен пароль. Минимум 6 символа.")
        .max(30, "Неверно заполнен пароль. Максимум 30 символов."),
});

const AuthorizationContainer = ({ className }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            passeord: "",
        },
        resolver: yupResolver(authFormShema),
    });

    const [serverError, setServerError] = useState();

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(error);
            }
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;

    const errorMessage = formError || serverError;

    const Form = styled.form`
        display: flex;
        flex-direction: column;
    `;

    const Input = styled.input`
        margin-bottom: 5px;
        color: #000;
        background: #fff;
        border: 1px solid #000;
        padding: 3px 5px;
    `;

    const Botton = styled.button`
        cursor: pointer;
        background-color: blue;
        color: #fff;
    `;

    const ErrorMessage = styled.div`
        color: red;
        font-width: bold;
    `;

    const Title = styled.h2`
        margin-bottom: 5px;
    `;

    return (
        <div className={className}>
            <Title>Авторизация</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder="логин" {...register("login")} />
                <Input type="password" placeholder="пароль" {...register("password")} />
                <Botton type="submit" disabled={!!formError}>
                    Войти
                </Botton>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </Form>
        </div>
    );
};

export const Authrization = styled(AuthorizationContainer)`
    display: flex;
    flex-direction: column;
    width: 260px;
    margin: 0 auto;
    margin-top: 15px;
`;
