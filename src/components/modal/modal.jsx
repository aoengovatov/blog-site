import styled from "styled-components";
import { Button } from "../button/button";
import { useSelector } from "react-redux";
import {
    selectModalIsOpen,
    selectModalOnCalcel,
    selectModalOnConfirn,
    selectModalText,
} from "../../selectors";

const ModalContainer = ({ className }) => {
    const text = useSelector(selectModalText);
    const onConfirn = useSelector(selectModalOnConfirn);
    const onCancel = useSelector(selectModalOnCalcel);
    const isOpen = useSelector(selectModalIsOpen);

    /*if (!isOpen) {
        return null;
    }*/

    return (
        <div className={className}>
            <div className="overlay"></div>
            <div className="box">
                <h3 className="modal-title">Удалить комментарий?{text}</h3>
                <div className="buttons">
                    <Button width="120px" onClick={onConfirn}>
                        Ок
                    </Button>
                    <Button width="120px" onClick={onCancel}>
                        Отмена
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const Modal = styled(ModalContainer)`
    position: fixed;
    z-index: 20;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    & .overlay {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
    }

    & .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
        background-color: white;
        border: 2px solid #3465e3;
        border-radius: 8px;
        padding: 20px;
        width: 350px;
        margin: 0 auto;
        z-index: 30;
    }

    & .modal-title {
        color: #3465e3;
        font-size: 23px;
        margin-bottom: 10px;
    }

    & .buttons {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
    }
`;
