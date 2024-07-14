import {FC, ReactNode} from "react";

import styles from "./Modal.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store.ts";
import {closeModal} from "../../../store/slices/modalSlice.ts";
import {Button} from "../Button";
import {IoMdClose} from "react-icons/io";

import iconStyles from '../../styles/icons.module.scss'

interface CustomModalProps {
    children?: ReactNode;
    onClose?: () => void
}

const Modal: FC<CustomModalProps> = ({children, onClose}) => {
    const dispatch: AppDispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen)

    if (!isOpen) {
        return null
    }

    return <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
            <Button
                className={styles.close}
                onClick={() => {
                    if(onClose) {
                        onClose()
                    }else {
                        dispatch(closeModal())
                    }
                }}
            >
                <IoMdClose className={iconStyles.iconModal}/>
            </Button>
            {children}
        </div>
    </div>
}

export default Modal