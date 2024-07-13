import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {closeModal} from "../../store/slices/modalSlice.ts";
import {Button} from "../../shared/components";
import {adedProduct, updateProduct} from "../../store/slices/productsSlice.ts";

import styles from './AddAndEditProductForm.module.scss'

export const AddAndEditProductForm = () => {
    const dispatch = useDispatch();

    const [product,setProduct] = useState<any>({
        name: '',
        type: '',
        image: null
    });
    const productFromList = useSelector((state: RootState) => state.modal.product);

    const onChange = ({target}) => {
        const {name,value} = target

        setProduct((prevState)=> ({
            ...prevState,
            [name]: value
        }))
    }

    const clearState = () => {
        setProduct({
            name: '',
            type: '',
            image: null
        })
    }

    useEffect(() => {
        if (productFromList) {
            setProduct(productFromList)
        }
    }, [productFromList]);

    const handleSubmit = () => {
        if(productFromList){
            dispatch(updateProduct({...product,id: product.id}))
        }else{
            dispatch(adedProduct(product))

        }
        dispatch(closeModal())
        clearState()
    };

    return <form className={styles.form}>
        <input
            name={'name'}
            type={'text'}
            placeholder={'Назва продукту'}
            onChange={onChange}
            value={product.name}
            className={styles.input}
        />
        <input
            name={'type'}
            type={'text'}
            placeholder={'Тип продукту'}
            onChange={onChange}
            value={product.type}
            className={styles.input}
        />
        <label className={styles.labelInputFile}>
            {product.image  ? product.image.name : 'Виберіть зображення'}
            <input
                className={styles.inputFile}
                name={'image'}
                type={'file'}
                accept={'image/*,.jpeg,.jpg,png,.web'}
                onChange={(e) => setProduct((prevState) => ({
                    ...prevState,
                    image: e.target.files ? e.target?.files[0] : null
                }))}
            />
        </label>
        <Button
            onClick={handleSubmit}
            text={productFromList ? 'Зберегти' : 'Додати'}
        />
    </form>
}