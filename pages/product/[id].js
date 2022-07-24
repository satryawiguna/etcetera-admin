import AdminHook from "../../components/layouts/admin.hook";
import {wrapper} from '../../redux/store'
import {readProduct} from "../../redux/features/product";

const ProductDetail = () => {
    return (
        <div>
            <AdminHook title={"Product Detail"}>

            </AdminHook>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({params, req}) => {
        const id = params.id
        await store.dispatch(readProduct({id, req}));
    }
);

export default ProductDetail
