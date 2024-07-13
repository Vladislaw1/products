import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteProduct, getProducts} from "./store/slices/productsSlice.ts";
import {AppDispatch, RootState} from "./store/store.ts";
import {Header, ModalProduct, ProductsList} from "./components";
import Modal from "./shared/components/Modal/Modal.tsx";

function App() {


  return (
      <>
        <Header/>
        <ModalProduct/>
        <ProductsList/>
      </>
  )
}

export default App
