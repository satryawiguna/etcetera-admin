import AdminHook from "../../components/layouts/admin.hook";
import {fetchProductCategories, productCategorySelectors} from "../../redux/features/productCategorySlice";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import ProductCategories from "../../components/ProductCategories";
import Page from "../../components/Page";


const ProductCategory = () => {
    const dispatch = useDispatch();
    const productCategories = useSelector((state) => productCategorySelectors.selectAll(state));
    const pages = useSelector((state) => state.productCategory.links);

    useEffect(() => {
        dispatch(fetchProductCategories());
    }, [dispatch]);

    return (
        <AdminHook title={"Product Category"}>
            <div className="card-body">
                <Link href="/product-category/add">
                    <button type="button" className="btn btn-primary mb-2">Add Product Category</button>
                </Link>
                <table id="example2" className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th width="60">Image</th>
                        <th>Name</th>
                        <th width="275">Action(s)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <ProductCategories
                        items={productCategories} />
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

export default ProductCategory;