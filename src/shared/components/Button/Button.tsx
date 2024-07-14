import {FC, ReactNode} from "react";
import styles from './button.module.scss'
import cn from "classnames";

interface ButtonProps{
    children?: ReactNode;
    text?: string;
    className?: string;
    onClick: (e: any) => void;
    disabled?:boolean
}

export const Button: FC<ButtonProps> = ({onClick,text,disabled,className,children}) => {
    return <button disabled={disabled} onClick={(e: any) => onClick(e)} className={cn(styles.button,className)}> {children || text}</button>
}