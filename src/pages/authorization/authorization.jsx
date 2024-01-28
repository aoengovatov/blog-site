import { useForm } from "react-hook-form";
import { useDispatch, useStore, useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constants";
import { setUser } from "../../actions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate } from "react-router-dom";
import { server } from "../../bff";
import { useState, useEffect } from "react";
import { Input, Button, H2 } from "../../components";
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
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            passeord: "",
        },
        resolver: yupResolver(authFormShema),
    });

    const [serverError, setServerError] = useState(null);

    const dispatch = useDispatch();
    const store = useStore();

    const roleId = useSelector(selectUserRole);

    useEffect(() => {
        let previousWasLogout = store.getState().app.wasLogout;

        return store.subscribe(() => {
            let currentWasLogout = previousWasLogout;
            currentWasLogout = store.getState().app.wasLogout;

            if (currentWasLogout != previousWasLogout) {
                reset();
            }
        });
    }, [reset, store]);

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }
            dispatch(setUser(res));
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;

    const errorMessage = formError || serverError;

    const Form = styled.form`
        display: flex;
        flex-direction: column;
        width: 260px;
    `;

    const ErrorMessage = styled.div`
        color: red;
        font-width: bold;
    `;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />;
    }

    return (
        <div className={className}>
            <H2>Авторизация</H2>
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
                <Button type="submit" disabled={!!formError}>
                    авторизоваться
                </Button>
                <Link to="/register">
                    <Button>Регистрация</Button>
                </Link>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </Form>
        </div>
    );
};

export const Authrization = styled(AuthorizationContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-top: 15px;
`;
