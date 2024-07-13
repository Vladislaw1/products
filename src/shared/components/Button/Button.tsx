import {FC, ReactNode} from "react";

interface ButtonProps{
    children?: ReactNode;
    text?: string;
    className?: string;
    onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({onClick,text,className,children}) => {
    return <button onClick={onClick} className={className}>{children || text}</button>
}