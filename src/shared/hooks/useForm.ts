import { useState} from 'react';

export const useForm = <T,>(initialState: T, onSubmit: (data: T) => void = (data) => data) => {
    const [data,setData] = useState<any>(initialState);

    const handleChange = ({target}:{target: HTMLInputElement}) => {
        const {name,value} = target;

        if(target?.files){
            setData({...data, [name]: target?.files[0]});
        }else{
            setData({...data,[name]:value})
        }
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        onSubmit(data)
        reset()
    }

    function reset(){
        setData(initialState)
    }

    return [data,reset,handleChange,handleSubmit];
}

