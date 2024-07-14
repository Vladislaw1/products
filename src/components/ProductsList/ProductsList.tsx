import {getProducts} from "../../store/slices/productsSlice.ts";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {ProductCard} from "../ProductCard";

import styles from "./ProductsList.module.scss";
import {Product} from "../../shared/types";

export const ProductsList = () => {
    const dispatch: AppDispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products)
    const loading = useSelector((state: RootState) => state.products.loading)
    const error = useSelector((state: RootState) => state.products.error)

    useEffect(()=>{
        dispatch(getProducts())
    },[])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <ul className={styles.list}>
        {products.map((product: Product) => <ProductCard key={product.id} product={product}/>)}
    </ul>
}