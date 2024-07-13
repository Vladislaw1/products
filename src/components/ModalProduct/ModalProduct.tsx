import {Button, CustomModal} from "../../shared/components";

import {AddAndEditProductForm} from "../AddAndEditProductForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {movieDownProduct, movieUpProduct} from "../../store/slices/productsSlice.ts";

import styles from './Modal.module.scss'
import {useState} from "react";
import axios from "axios";

export const ModalProduct = () => {
    const [isOpenAllProduct,setIsOPenAllProduct] = useState(false)
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products)
    const productCurrent = useSelector((state: RootState) => state.modal.product)


     const updateItems = async (items) => {
        await Promise.all(items.map(item => axios.put(`https://668f8ffac0a7969efd9853e6.mockapi.io/shop/products/${item.id}`, item)));
    };

    return <CustomModal>
        <h1>Add Product</h1>
        <AddAndEditProductForm/>
        {productCurrent && <Button text={'Список товарів'} onClick={() => setIsOPenAllProduct(true)}/>}
        {isOpenAllProduct &&
            <CustomModal close={() => setIsOPenAllProduct(false)}>
                <ul>
                    {products?.map(product => <>
                        <p className={product?.id === productCurrent?.id ? styles.active : ''}>{product.name}</p>
                    </>)}
                </ul>
                <div>
                    <Button text={'Up'} onClick={() => dispatch(movieUpProduct(productCurrent))}/>
                    <Button text={'Down'} onClick={() => dispatch(movieDownProduct(productCurrent))}/>
                </div>
            </CustomModal>
        }
     </CustomModal>
}