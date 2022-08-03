import AdminHook from "../../components/layouts/admin.hook";
import Head from "next/head";
import {wrapper} from "../../redux/store";
import {fetchProductCategories} from "../../redux/features/productCategorySlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import he from "he";
import Link from "next/link";


const ProductCategory = () => {
    const productCategories = useSelector((state) => state.productCategory.data);
    const datas = productCategories.data;
    const links = productCategories.links;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductCategories());
    }, []);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/static/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"/>
                <link rel="stylesheet" href="/static/plugins/datatables-responsive/css/responsive.bootstrap4.min.css"/>
                <link rel="stylesheet" href="/static/plugins/datatables-buttons/css/buttons.bootstrap4.min.css"/>
            </Head>
            <div>
                <AdminHook title={"Product Category"}>
                    <div className="card-body">
                        <Link href="/product-category/add">
                            <button type="button" className="btn btn-primary mb-2">Add Category</button>
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
                            {datas ? datas.map(item => {
                                return (
                                    <>
                                        <tr>
                                            <td><img src={(item.image) ?? `https://via.placeholder.com/60/CCCCCC/000000/?text=No Image`} /></td>
                                            <td>{item.name}</td>
                                            <td>
                                                <Link href={`/product-category/${item.id}`}>
                                                    <button type="button" className="btn btn-primary mb-2 mr-2">Preview</button>
                                                </Link>
                                                <Link href={ `/product-category/${item.id}/edit` }>
                                                    <button type="button" className="btn btn-warning mb-2  mr-2">Edit</button>
                                                </Link>
                                                <Link href={ `/product-category/${item.id}/delete` }>
                                                    <button type="button" className="btn btn-danger mb-2">Delete</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }) : ("")}
                            </tbody>
                        </table>
                        <div className="card-footer clearfix">
                            <ul className="pagination pagination-sm m-0 float-right">
                                {links ? links.map(item => {
                                    return (
                                        <>
                                            <li className="page-item"><a className="page-link" href="#">{he.decode(item.label)}</a></li>
                                        </>
                                    )
                                }) : ("")}
                            </ul>
                        </div>
                    </div>

                </AdminHook>
            </div>
        </>
    )
}

export default ProductCategory;