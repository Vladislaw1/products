import {FC} from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../shared";

import {openModal} from "../../store/slices/modalSlice.ts";
import {deleteProduct} from "../../store/slices/productsSlice.ts";

import {Product} from "../../shared";
import {MdDeleteOutline, MdEditNote} from "react-icons/md";

import styles from './ProductCard.module.scss'
import iconStyles from '../../shared/styles/icons.module.scss'

interface ProductCard {
    product: Product
}

export const ProductCard: FC<ProductCard> = ({product}) => {
    const dispatch = useDispatch<any>();

    return <li key={product.id} className={styles.card}>
        <h2>{product.name}</h2>
        <img src={product.image as string} alt={product.name} width={200} height={100}/>
        <p>{product.type}</p>
        <div className={styles.blockBtn}>
            <Button
                onClick={() => dispatch(deleteProduct(product.id))}
            >
                <MdDeleteOutline className={iconStyles.icon}/>
            </Button>
            <Button
                onClick={() => dispatch(openModal(product))}
            >
                <MdEditNote className={iconStyles.icon}/>
            </Button>
        </div>
    </li>
}