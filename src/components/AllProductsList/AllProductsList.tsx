import {Button, CustomModal, Product} from "../../shared";
import {movieDownProduct, movieUpProduct} from "../../store/slices/productsSlice.ts";
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

import {CiSquareChevDown, CiSquareChevUp} from "react-icons/ci";

import styles from "./AllProductsList.module.scss";
import iconStyles from '../../shared/styles/icons.module.scss'

interface AllProductsList {
    close?: () => void;
    checkProduct: Product
}

export const AllProductsList: FC<AllProductsList> = ({close,checkProduct}) =>{
    const dispatch = useDispatch<any>();
    const products = useSelector((state: RootState) => state.products.products)

    return <CustomModal onClose={() => close && close()}>
            <ul>
                {products?.map((product: Product) => <>
                    <p className={ product?.id === checkProduct?.id ? styles.active : ''}>{product.name}</p>
                </>)}
            </ul>
            <div>
                <Button  onClick={() => dispatch(movieUpProduct(checkProduct))}>
                    <CiSquareChevUp className={iconStyles.iconModal}/>
                </Button>
                <Button onClick={() => dispatch(movieDownProduct(checkProduct))}>
                    <CiSquareChevDown className={iconStyles.iconModal}/>
                </Button>
            </div>
        </CustomModal>
}