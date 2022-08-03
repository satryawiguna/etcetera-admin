import AdminHook from "../../../components/layouts/admin.hook";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {readProductCategory, updateProductCategory} from "../../../redux/features/productCategorySlice";
import Swal from 'sweetalert2'
import {wrapper} from "../../../redux/store";

const AddProductCategory = () => {
    const productCategory = useSelector((state) => state.productCategory);
    const dispatch = useDispatch();
console.log(productCategory);
    const [productCategoryFields, setProductCategoryFields] = useState({});
    const [progress, setProgress] = useState(false);

    async function doUpdate(e) {
        setProgress(true);

        try {
            e.preventDefault();

            let formData = new FormData();

            formData.append('name', productCategoryFields.name);
            formData.append('file', productCategoryFields.file);
            formData.append('description', productCategoryFields.description);

            dispatch(createProductCategory(formData))
                .then((payload) => {
                    if (payload.type == "productCategory/createProductCategory/fulfilled")
                        Swal.fire({
                            icon: 'success',
                            title: `${payload.payload}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                });

            setProductCategoryFields({});
            e.target.reset();
        } catch (error) {
            setAlert({
                visible: true,
                type: "error",
                title: "Error",
                message: error.message
            });
        }

        setProgress(false);
    }

    function setValue(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setProductCategoryFields({
            ...productCategoryFields,
            [name]: value
        });
    }

    return (
        <div>
            <AdminHook title={"Add Product Category"}>
                <form onSubmit={doUpdate} method="post">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter name"
                                onChange={setValue}
                                disabled={progress}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputFile">Image</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        name="file"
                                        onChange={setValue}
                                        disabled={progress}
                                    />
                                    <label className="custom-file-label" htmlFor="image">
                                        Choose file
                                    </label>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text">Upload</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control"
                                      name="description"
                                      rows="3"
                                      placeholder="Description..."
                                      onChange={setValue}
                                      disabled={progress}></textarea>
                        </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <Link href={ `/product-category` }>
                            <button type="button" className="btn btn-default mb-2 mr-2">Cancel</button>
                        </Link>
                        <button type="submit" className="btn btn-primary mb-2">
                            Save
                        </button>
                    </div>
                </form>
            </AdminHook>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({params}) => {
        const id = params.id;

        await store.dispatch(readProductCategory(id));
    });

export default AddProductCategory
