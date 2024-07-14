import {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";
import {openModal} from "../../store/slices/modalSlice.ts";

import {Button} from "../../shared";
import {IoAddSharp} from "react-icons/io5";

import styles from './Header.module.scss'
import iconStyles from '../../shared/styles/icons.module.scss'

export const Header = () => {

    const dispatch : AppDispatch = useDispatch();

    return <header className={styles.header}>
        <Button
            onClick={() => dispatch(openModal())}
            className={styles.add}
        >
            <IoAddSharp className={iconStyles.plusIcon}/>
        </Button>
    </header>
}