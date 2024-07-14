import {ChangeEvent,useState} from 'react';

export const useForm = <T,>(initialState: T, onSubmit: (data: T) => void = (data) => data) => {
    const [data,setData] = useState<any>(initialState);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target;

        if(event.target?.files){
            setData({...data, [name]: event.target?.files[0]});
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

