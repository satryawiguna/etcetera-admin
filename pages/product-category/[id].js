import AdminHook from "../../components/layouts/admin.hook";
import {wrapper} from "../../redux/store";

const ProductCategoryDetail = () => {
    return (
        <div>
            <AdminHook title={"Product CategoryDetail"}>

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

export default ProductCategoryDetail
