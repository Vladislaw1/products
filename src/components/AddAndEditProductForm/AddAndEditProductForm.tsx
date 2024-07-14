import { FC, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";

import {MdOutlineSaveAlt} from "react-icons/md";
import {IoAddSharp} from "react-icons/io5";
import {CiBoxList} from "react-icons/ci";

import {RootState} from "../../store/store.ts";

import {Button, Input, useForm} from "../../shared";

import {addNewProduct, updateProduct} from "../../store/slices/productsSlice.ts";
import {closeModal} from "../../store/slices/modalSlice.ts";

import {Product} from "../../shared";

import iconStyles from '../../shared/styles/icons.module.scss'
import {AllProductsList} from "../AllProductsList";

import styles from './AddAndEditProductForm.module.scss'

export const AddAndEditProductForm: FC = () => {
    const dispatch = useDispatch<any>();

    const [isOpenAllProduct,setIsOPenAllProduct] = useState(false)

    const checkProduct = useSelector((state: RootState) => state.modal.product) as any
    const productFromList = useSelector((state: RootState) => state.modal.product);

    const initialState  = productFromList || {
        name: '',
        type: '',
        image: null,
        id: ''
    }

    const onSubmit = useCallback((product: Product) => {
        if(productFromList){
            dispatch(updateProduct({...product,id: product.id}))
        }else{
            dispatch(addNewProduct(product))
        }
        dispatch(closeModal())
        reset()
    },[dispatch])

    const [data,reset,handleChange, handleSubmit] = useForm<Product>(initialState, onSubmit)

    const isDisabled = (checkProduct && checkProduct.name === data.name) || data.type === '' || data.name === '' || (!checkProduct && !data.image)

    return <>
        <form className={styles.form}>
            <Input
                name={'name'}
                type={'text'}
                placeholder={'Назва продукту'}
                onChange={handleChange}
                value={data.name}
            />
            <Input
                name={'type'}
                type={'text'}
                placeholder={'Тип продукту'}
                onChange={handleChange}
                value={data.type}
            />
            <Input
                name={'image'}
                type={'file'}
                onChange={handleChange}
                accept={'image/*,.jpeg,.jpg,png,.web'}
            />
        </form>
        <div>
            <Button
                onClick={handleSubmit}
                disabled={isDisabled}
            >
                {checkProduct ?  <MdOutlineSaveAlt className={cn(iconStyles.iconModal,{[iconStyles.disabledIcon]: isDisabled})}/> : <IoAddSharp className={cn(iconStyles.iconModalXS, {[iconStyles.disabledIcon]: isDisabled})}/>}
            </Button>
            {checkProduct &&
                <>
                    <Button onClick={() => setIsOPenAllProduct(true)}>
                        <CiBoxList className={iconStyles.iconModal}/>
                    </Button>
                </>
            }
        </div>
        {isOpenAllProduct && <AllProductsList close={() => setIsOPenAllProduct(false)} checkProduct={checkProduct}/>}
    </>
}