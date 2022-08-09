import React from 'react'
import ProductList from "./ProductList";
import {wrapper} from "../redux/store";
import {fetchProductCategories} from "../redux/features/productCategorySlice";

const Products = ({items}) => {
    return (
        <>
            {
                items && items.length > 0 ? (
                    items.map(item => (
                        <ProductList
                            key={item.id}
                            item={item} />
                    ))
                ) : ("")
            }
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        await store.dispatch(fetchProductCategories());
    }
);

export default Products;
