import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../../shared";
import axios from "axios";

interface ProductsSlice {
    products: Array<Product>,
    loading: boolean,
    error: null | string,
}

const initialState = {
    products:[],
    loading: false,
    error: null,
}

export const getProducts = createAsyncThunk('products/getProducts', async (_,{rejectWithValue})=>{
    try {
        const {data} = await axios.get('https://668f8ffac0a7969efd9853e6.mockapi.io/shop/products')
        return data
    }catch (error: any) {
        return rejectWithValue(error?.message);
    }

})

export const deleteProduct = createAsyncThunk('products/deleteProducts',async (id:string | undefined,{rejectWithValue,dispatch})=>{
    try {
        const {data} = await axios.delete(`https://668f8ffac0a7969efd9853e6.mockapi.io/shop/products/${id}`)
        dispatch(removeProduct(data.id))
    }catch (error: any) {
        return rejectWithValue(error?.message)
    }
})

export const addNewProduct = createAsyncThunk('products/addProduct',async (newProduct: Product,{rejectWithValue,dispatch}) =>{
    const {image} = newProduct

    const formData = new FormData()
    formData.append('image', image as Blob)

    const uploadResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: {
            key: 'c68952abcb9df6ad8fea0c4678375675'
        }
    });

    const imageUrl = uploadResponse.data.data.url;
    try {
        const {data} = await axios.post('https://668f8ffac0a7969efd9853e6.mockapi.io/shop/products', {...newProduct,image:imageUrl})
        dispatch(addProduct(data))
    }catch (error: any) {
        return rejectWithValue(error?.message)
    }
})

export const updateProduct = createAsyncThunk('products/updateProduct',async (product: Product,{rejectWithValue,dispatch,}) =>{
    try {
        const {data} = await axios.put(`https://668f8ffac0a7969efd9853e6.mockapi.io/shop/products/${product?.id}`,product)
        dispatch(editProduct(data))
    }catch (error: any) {
        return rejectWithValue(error?.message)
    }
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        addProduct: (state: Draft<ProductsSlice>, action: PayloadAction<Product>) => {
            state.products.push(action.payload)
        },
        removeProduct: (state: Draft<ProductsSlice>, action: PayloadAction<string>) => {
            state.products = state.products.filter((product: Draft<Product>) => product.id !== action.payload)
        },
        editProduct: (state: Draft<ProductsSlice>, action: PayloadAction<Product>) =>{
            const productIdx = state.products.findIndex((product: Draft<Product>) => product.id === action.payload.id)
            if (productIdx !== -1) {
                state.products[productIdx] = action.payload;
            }
        },
        movieUpProduct: (state: Draft<ProductsSlice>, action: PayloadAction<Product | null>) => {
            const idx = state.products.findIndex((product: Draft<Product>) => product.id === action.payload?.id)
            if(idx !== -1 && idx > 0){
                const [product] = state.products.splice(idx,1)
                state.products.splice(idx - 1, 0, product);
            }
        },
        movieDownProduct: (state: Draft<ProductsSlice>, action: PayloadAction<Product | null>) => {
            const idx = state.products.findIndex((product: Draft<Product>) => product.id === action.payload?.id)
            if(idx !== -1 && idx < state.products.length - 1){
                const [product] = state.products.splice(idx,1)
                state.products.splice(idx + 1, 0, product);
            }
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getProducts.pending,(state:Draft<ProductsSlice>) =>{
                state.loading = true
                state.error = null
            })
            .addCase(getProducts.fulfilled,(state:Draft<ProductsSlice>,action: PayloadAction<Product[]>) =>{
                state.loading = false
                state.products = action.payload
            })
            .addCase(getProducts.rejected,(state:Draft<ProductsSlice>,action) =>{
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { addProduct,removeProduct,editProduct,movieUpProduct,movieDownProduct } = productsSlice.actions
export default productsSlice.reducer