import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useResetForm } from "../../hooks";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constants";
import { setUser } from "../../actions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Input, Button, H2, AuthFormError } from "../../components";
import styled from "styled-components";
import { request } from "../../utils";

const regFormSchema = yup.object().shape({
    login: yup
        .string()
        .required("Заполните логин.")
        .matches(/\w+$/, "Неверно заполнен логин. Допускаются буквы и цифры.")
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
    passcheck: yup
        .string()
        .required("Заполните повтор пароля")
        .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
});

const RegistrationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            passeord: "",
            passcheck: "",
        },
        resolver: yupResolver(regFormSchema),
    });

    const [serverError, setServerError] = useState(null);

    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);

    useResetForm(reset);

    const onSubmit = ({ login, password }) => {
        request("/register", "POST", { login, password }).then(({ error, user }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }
            dispatch(setUser(user));
            sessionStorage.setItem("userData", JSON.stringify(user));
        });
    };

    const formError =
        errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;

    const errorMessage = formError || serverError;

    const Form = styled.form`
        display: flex;
        flex-direction: column;
        width: 260px;
    `;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />;
    }

    return (
        <div className={className}>
            <H2>Регистрация</H2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="логин"
                    {...register("login", { onChange: () => setServerError(null) })}
                />
                <Input
                    type="password"
                    placeholder="пароль"
                    {...register("password", { onChange: () => setServerError(null) })}
                />
                <Input
                    type="password"
                    placeholder="пароль повторно"
                    {...register("passcheck", { onChange: () => setServerError(null) })}
                />
                <Button type="submit" disabled={!!formError}>
                    зарегистрироваться
                </Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
            </Form>
        </div>
    );
};

export const Registration = styled(RegistrationContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-top: 15px;
`;
