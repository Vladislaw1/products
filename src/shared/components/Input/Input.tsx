import {InputType} from "../../types";
import {ChangeEvent, FC} from "react";
import styles from './Input.module.scss'
import cn from "classnames";

interface InputProps{
    name: string,
    type: InputType,
    onChange: (event: ChangeEvent) => void,
    placeholder?: string,
    value?: any;
    style?: string;
    accept?: string
    required?: boolean;
}

export const Input: FC<InputProps> = ({value,type,required,placeholder,onChange,name,style,accept}) => {
    return <input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(styles.input,style)}
        accept={accept || ''}
        required={required}
    />
}