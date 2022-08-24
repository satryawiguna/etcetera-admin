import AdminHook from "../../components/layouts/admin.hook";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, productSelectors} from "../../redux/features/productSlice";
import {useEffect} from "react";
import Link from "next/link";
import Page from "../../components/Page";
import Products from "../../components/Products";

const Product = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => productSelectors.selectAll(state));
    const pages = useSelector((state) => state.product.links);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <AdminHook title={"Product"}>
            <div className="card-body">
                <Link href="/product/add">
                    <button type="button" className="btn btn-primary mb-2">Add Product</button>
                </Link>
                <table id="example2" className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th width="60">Code/Image</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th width="275">Action(s)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Products
                        items={products} />
                    </tbody>
                </table>
                <div className="card-footer clearfix">
                    <Page
                        items={pages} />
                </div>
            </div>
        </AdminHook>
    )
}

export async function getStaticProps(context) {
    return { props: { isHome: true } };
}

export default Product
