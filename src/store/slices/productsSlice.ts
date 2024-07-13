import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

type Product = {
    "name": string,
    "image": string,
    "type": string,
    "id": string
}

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

export const getProducts = createAsyncThunk<Product[],void,{rejectValue: string}>('products/getProducts', async (_,{rejectWithValue,dispatch})=>{
    try {
        const {data} = await axios.get('https://668f8ffac0a7969efd9853e6.mockapi.io/shop/products')
        return data
    }catch (error) {
        return rejectWithValue(error.message);
    }

})

export const deleteProduct = createAsyncThunk('products/deleteProducts',async (id: string,{rejectWithValue,dispatch})=>{
    try {
        const {data} = await axios.delete(`https://668f8ffac0a7969efd9853e6.mockapi.io/shop/products/${id}`)
        dispatch(removeProduct(data.id))
    }catch (error) {
        return rejectWithValue(error.message)
    }
})

export const adedProduct = createAsyncThunk('products/addProduct',async (newProduct: Product,{rejectWithValue,dispatch}) =>{
    const {image} = newProduct
    const formData = new FormData()
    formData.append('image', image)
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
        console.log(newProduct)
        const {data} = await axios.post('https://668f8ffac0a7969efd9853e6.mockapi.io/shop/products', {...newProduct,image:imageUrl})
        dispatch(addProduct(data))
        console.log(data)
    }catch (error) {
        return rejectWithValue(error.message)
    }
})

export const updateProduct = createAsyncThunk('products/updateProduct',async (product,{rejectWithValue,dispatch,}) =>{
    try {
        const {data} = await axios.put(`https://668f8ffac0a7969efd9853e6.mockapi.io/shop/products/${product.id}`,product)
        dispatch(editProduct(data))
    }catch (error) {
        return rejectWithValue(error.message)
    }
})

const productsSlice = createSlice<ProductsSlice>({
    name: 'products',
    initialState,
    reducers:{
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        },
        editProduct: (state, action: PayloadAction<Product>) =>{
            const productIdx = state.products.findIndex(product => product.id === action.payload.id)
            if (productIdx !== -1) {
                state.products[productIdx] = action.payload;
            }
        },
        movieUpProduct: (state, action: PayloadAction<Product>) => {
            const idx = state.products.findIndex(product => product.id === action.payload.id)
            if(idx !== -1 && idx > 0){
                const [product] = state.products.splice(idx,1)
                console.log(product)
                state.products.splice(idx - 1, 0, product);
            }
        },
        movieDownProduct: (state, action: PayloadAction<Product>) => {
            const idx = state.products.findIndex(product => product.id === action.payload.id)
            if(idx !== -1 && idx < state.products.length - 1){
                const [product] = state.products.splice(idx,1)
                console.log(product)
                state.products.splice(idx + 1, 0, product);
            }
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getProducts.pending,(state) =>{
                state.loading = true
                state.error = null
            })
            .addCase(getProducts.fulfilled,(state,action: PayloadAction<Product[]>) =>{
                state.loading = false
                state.products = action.payload
            })
            .addCase(getProducts.rejected,(state,action) =>{
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { addProduct,removeProduct,editProduct,movieUpProduct,movieDownProduct } = productsSlice.actions
export default productsSlice.reducer