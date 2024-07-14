import {useSelector} from "react-redux";
import { CustomModal} from "../../shared/components";

import {AddAndEditProductForm} from "../AddAndEditProductForm";
import {RootState} from "../../store/store.ts";

export const ModalProduct = () => {
    const checkProduct = useSelector((state: RootState) => state.modal.product) as any


    return <CustomModal>
        <h1>{checkProduct ? 'Змінити' : 'Додати'} продукт</h1>
        <AddAndEditProductForm/>
    </CustomModal>
}