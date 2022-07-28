import AdminHook from "../../components/layouts/admin.hook";
import Head from "next/head";
import {wrapper} from "../../redux/store";
import {readProductCategories} from "../../redux/features/product-category";

const ProductCategory = () => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/static/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"/>
                <link rel="stylesheet" href="/static/plugins/datatables-responsive/css/responsive.bootstrap4.min.css"/>
                <link rel="stylesheet" href="/static/plugins/datatables-buttons/css/buttons.bootstrap4.min.css"/>
            </Head>
            <div>
                <AdminHook title={"Product Category"}>

                </AdminHook>
            </div>
        </>

    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ req, res }) => {
        const categories = await store.dispatch(readProductCategories());

        return {
            props: {
                data: JSON.parse(JSON.stringify(categories))
            }
        }
    });

export default ProductCategory
