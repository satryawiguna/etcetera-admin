import AdminHook from "../../../components/layouts/admin.hook";
import ProductCategoryForm from "../../../components/ProductCategoryForm";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import {useState, useEffect} from "react";
import {
    productCategorySelectors,
    updateProductCategory
} from "../../../redux/features/productCategorySlice";
import {useRouter} from "next/router";

const EditProductCategory = (props) => {
    const dispatch = useDispatch();
    const productCategory = useSelector((state) => productCategorySelectors.selectById(state, parseInt(props.id)));
    const router = useRouter();

    const [productCategoryFields, setProductCategoryFields] = useState({});
    const [progress, setProgress] = useState(false);

    useEffect(() => {
        setProductCategoryFields({
            name: productCategory.name,
            file: productCategory.image,
            description: productCategory.description
        });
    }, [productCategory])

    async function doUpdate(e) {
        setProgress(true);

        try {
            e.preventDefault();

            let formData = new FormData();

            formData.append('name', productCategoryFields.name);
            formData.append('file', productCategoryFields.file);
            formData.append('description', productCategoryFields.description);

            dispatch(updateProductCategory({id: props.id, data: formData}))
                .then((payload) => {
                    if (payload.meta.requestStatus === "fulfilled") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: `${payload.payload}`,
                        }).then((result) => {
                            router.push('/product-category');
                        });
                    } else if (payload.meta.requestStatus === "rejected") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `${payload.payload.message}`,
                        }).then((result) => {
                            router.push('/product-category');
                        });
                    }
                });
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
            <AdminHook title={"Edit Product Category"}>
                <ProductCategoryForm
                    type="edit"
                    doUpdate={doUpdate}
                    setValue={setValue}
                    progress={progress}
                    productCategory={productCategory}
                />
            </AdminHook>
        </div>
    )
}

export async function getServerSideProps(context) {
    return {props: {id: context.query.id, isHome: true}};
}

export default EditProductCategory
