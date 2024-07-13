import React, {FC, ReactNode} from "react";

import styles from "./Modal.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store.ts";
import {closeModal} from "../../../store/slices/modalSlice.ts";
import {Button} from "../Button";

interface CustomModalProps {
    children?: ReactNode;
    close?: () => void
}

const Modal: FC<CustomModalProps> = ({children, close}) => {
    const dispatch: AppDispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen)

    if (!isOpen) {
        return null
    }

    return <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
            <Button
                text={'X'}
                className={styles.close}
                onClick={() => {
                    if(close) {
                        close()
                    }else {
                        dispatch(closeModal())
                    }
                }}
            />
            {children}
        </div>
    </div>
}

export default Modal