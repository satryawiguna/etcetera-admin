import AdminHook from "../../components/layouts/admin.hook";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import {createProductCategory, productCategorySelectors} from "../../redux/features/productCategorySlice";
import ProductForm from "../../components/ProductForm";
import {productSelectors} from "../../redux/features/productSlice";


const AddProduct = () => {
    const dispatch = useDispatch();
    const productCategories = useSelector((state) => productCategorySelectors.selectAll(state));
    const products = useSelector((state) => productSelectors.selectAll(state));

    const MAX_FILE_COUNT = 5;

    const [productFields, setProductFields] = useState({});
    const [progress, setProgress] = useState(false);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);

    const [colorCodes, setColorCodes] = useState([]);
    const [addColor, setAddColor] = useState("");

    async function doSave(e) {
        setProgress(true);

        try {
            e.preventDefault();

            let formData = new FormData();

            formData.append('name', productFields.name);
            formData.append('file', productFields.file);
            formData.append('description', productFields.description);

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

            setProductFields({});
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

    function parseUploadFiles(uploaded) {
        let parseUploaded = [];

        uploaded.map(item => {
            parseUploaded.push(item.file);
        });

        return parseUploaded
    }

    function doUploadFiles(files) {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;

        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                const uploadFilesObject = {
                    url: URL.createObjectURL(file),
                    file: file
                }

                uploaded.push(uploadFilesObject);

                if (uploaded.length === MAX_FILE_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_FILE_COUNT) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `You can only add a maximum of ${MAX_FILE_COUNT} files`
                    });

                    setFileLimit(false);
                    limitExceeded = true;
                }
            }
        })

        if (!limitExceeded) setUploadedFiles(uploaded)

        return parseUploadFiles(uploaded);
    }

    function doPushColorCode(colorCode) {
        const colorCoded = [...colorCodes];

        if (colorCoded.indexOf(colorCode) == -1 && colorCode != "") {
            colorCoded.push(colorCode);
        }

        setColorCodes(colorCoded);

        return colorCoded;
    }

    function setValue(e) {
        const target = e.target;
        const name = target.name;
        let value;

        if (name == "product_image") {
            const chosenFiles = Array.prototype.slice.call(target.files);
            value = doUploadFiles(chosenFiles);
        } else if (name == "color_code") {
            const chosenColors = target.value;
            value = doPushColorCode(chosenColors);
        } else {
            value = target.value;
        }
        
        setProductFields({
            ...productFields,
            [name]: value
        });

        console.log(productFields);
    }

    return (
        <>
            <AdminHook title={"Add Product"}>
                <ProductForm
                    type="add"
                    setValue={setValue}
                    doSave={doSave}
                    progress={progress}
                    fileLimit={fileLimit}

                    productFields={productFields}
                    setProductFields={setProductFields}
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                    colorCodes={colorCodes}
                    setColorCodes={setColorCodes}
                    addColor={addColor}
                    setAddColor={setAddColor}

                    products={products}
                    productCategories={productCategories}
                />
            </AdminHook>
        </>
    )
}

export async function getStaticProps(context) {
    return { props: { isHome: true } };
}

export default AddProduct
