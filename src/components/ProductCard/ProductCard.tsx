import {deleteProduct} from "../../store/slices/productsSlice.ts";
import {useDispatch} from "react-redux";
import {Button} from "../../shared/components";
import {openModal} from "../../store/slices/modalSlice.ts";

import styles from './ProductCard.module.scss'

export const ProductCard = ({product}) => {
    const dispatch = useDispatch();

    return <li key={product.id} className={styles.card}>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} width={'200'} height={100}/>
        <p>{product.type}</p>
        <div>
            <Button
                onClick={() => dispatch(deleteProduct(product.id))}
                text={'Delete'}
            />
            <Button
                onClick={() => dispatch(openModal(product))}
                text={'Update'}
            />
        </div>
    </li>
}