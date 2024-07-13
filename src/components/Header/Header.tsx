import {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";
import {openModal} from "../../store/slices/modalSlice.ts";

import styles from './Header.module.scss'
import {Button} from "../../shared/components";

export const Header = () => {
    const dispatch : AppDispatch = useDispatch();
    return <header className={styles.header}>
        <Button
            onClick={() => dispatch(openModal())}
            text={'Додати товар'}
            className={styles.add}
        />
    </header>
}