import AdminHook from "../../components/layouts/admin.hook";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Swal from 'sweetalert2'
import ProductCategoryForm from "../../components/ProductCategoryForm";
import {createProductCategory} from "../../redux/features/productCategorySlice";

const AddProductCategory = () => {
    const dispatch = useDispatch();

    const [productCategoryFields, setProductCategoryFields] = useState({});
    const [progress, setProgress] = useState(false);

    async function doSave(e) {
        setProgress(true);

        try {
            e.preventDefault();

            let formData = new FormData();

            formData.append('name', productCategoryFields.name);
            formData.append('file', productCategoryFields.file);
            formData.append('description', productCategoryFields.description);

            await dispatch(createProductCategory(formData))
                .then((payload) => {
                    if (payload.meta.requestStatus === "fulfilled") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: `${payload.payload}`
                        });
                    } else if (payload.meta.requestStatus === "rejected") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `${payload.payload.message}`
                        });
                    }

                });

            setProductCategoryFields({});
            e.target.reset();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
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
                <ProductCategoryForm
                    type="add"
                    setValue={setValue}
                    doSave={doSave}
                    progress={progress}
                    />
            </AdminHook>
        </div>
    )
}

export async function getStaticProps(context) {
    return { props: { isHome: true } };
}

export default AddProductCategory
