import AdminHook from "../../../components/layouts/admin.hook";
import ProductForm from "../../../components/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { productSelectors } from "../../../redux/features/productSlice";

const EditProduct = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => productSelectors.selectById(state, parseInt(props.id)))

    return (
        <div>
            <AdminHook title={"Edit Product"}>
                <ProductForm
                    type="edit"
                    doUpdate={doUpdate}
                    setValue={setValue}
                    progress={progress}
                    product={product}
                />
            </AdminHook>
        </div>
    )
};

export default EditProduct