import AdminHook from "../../components/layouts/admin.hook";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { productCategorySelectors } from "../../redux/features/productCategorySlice";
import ProductForm from "../../components/ProductForm";
import { productSelectors } from "../../redux/features/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const productCategories = useSelector((state) =>
    productCategorySelectors.selectAll(state)
  );
  const products = useSelector((state) => productSelectors.selectAll(state));

  const [productFields, setProductFields] = useState({});

  const MAX_FILE_COUNT = 5;
  const [fileCountLimit, setFileCountLimit] = useState(false);
  const [productImageFiles, setProductImageFiles] = useState([]);

  const [colorCode, setColorCode] = useState("");
  const [colorCodeItems, setColorCodeItems] = useState([]);

  const [colorName, setColorName] = useState("");
  const [colorNameItems, setColorNameItems] = useState([]);

  const [sizepItems, setSizepItems] = useState([""]);
  const [sizelItems, setSizelItems] = useState([""]);
  const [sizetItems, setSizetItems] = useState([""]);

  const [priceItems, setPriceItems] = useState([""]);

  const [progress, setProgress] = useState(false);

  async function doSave(e) {
    setProgress(true);

    try {
      e.preventDefault();

      let formData = new FormData();

      formData.append("code", productFields.code);
      formData.append("cover_image", productFields.cover_image);
      formData.append("cover_square_image", productFields.cover_square_image);
      formData.append("product_image", productFields.product_image);
      formData.append("product_name", productFields.product_name);
      formData.append("composition_care", productFields.composition_care);
      formData.append("description", productFields.description);
      formData.append("status_available", productFields.status_available);
      formData.append("category", productFields.category);
      formData.append("sku", productFields.sku);
      formData.append("color_code", productFields.color_code);
      formData.append("color_name", productFields.color_name);
      formData.append("sizep", productFields.sizep);
      formData.append("sizel", productFields.sizel);
      formData.append("sizet", productFields.sizet);
      formData.append("price", productFields.price);
      formData.append("volume_unit", productFields.volume_unit);

      await dispatch(createProduct(formData)).then((payload) => {
        if (payload.meta.requestStatus === "fulfilled") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `${payload.payload}`,
          });
        } else if (payload.meta.requestStatus === "rejected") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `${payload.payload.message}`,
          });
        }
      });

      setProductFields({});
      e.target.reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setProgress(false);
  }

  function parseFiles(uploaded) {
    let parsedFiles = [];

    uploaded.map((item) => {
      parsedFiles.push(item.file);
    });

    return parsedFiles;
  }

  function doAddFiles(name, files) {
    let nameSplited = name.split("_");

    nameSplited.map((item, index) => {
      if (index != 0)
        nameSplited[index] = item.charAt(0).toUpperCase() + item.slice(1);
    });

    let newName = nameSplited.join("");

    const uploaded = [...eval(newName + "Files")];

    let countLimitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        const filesObject = {
          url: URL.createObjectURL(file),
          file: file,
        };

        uploaded.push(filesObject);

        if (uploaded.length === MAX_FILE_COUNT) setFileCountLimit(true);
        if (uploaded.length > MAX_FILE_COUNT) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `You can only add a maximum of ${MAX_FILE_COUNT} files`,
          });

          setFileCountLimit(false);
          countLimitExceeded = true;
        }
      }
    });

    if (!countLimitExceeded)
      eval(
        "set" + newName.charAt(0).toUpperCase() + newName.slice(1) + "Files"
      )(uploaded);

    return parseFiles(uploaded);
  }

  function doRemoveFile(name, file) {
    let nameSplited = name.split("_");

    nameSplited.map((item, index) => {
      if (index != 0)
        nameSplited[index] = item.charAt(0).toUpperCase() + item.slice(1);
    });

    let newName = nameSplited.join("");

    const newUploaded = eval(newName + "Files").filter(
      (item) => item.url !== file.url
    );
    eval("set" + newName.charAt(0).toUpperCase() + newName.slice(1) + "Files")(
      newUploaded
    );

    productFields[name] = newUploaded;
    setProductFields({
      ...productFields,
    });
  }

  function doAddItem(name, value) {
    let nameSplited = name.split("_");

    nameSplited.map((item, index) => {
      if (index != 0)
        nameSplited[index] = item.charAt(0).toUpperCase() + item.slice(1);
    });

    let newName = nameSplited.join("");

    const added = [...eval(newName + "Items")];

    if (added.indexOf(value) == -1 && value != "") {
      added.push(value);
    }

    eval("set" + newName.charAt(0).toUpperCase() + newName.slice(1) + "Items")(
      added
    );

    return added;
  }

  function doSyncItem(name, value, index) {
    let nameSplited = name.split("_");

    nameSplited.map((item, index) => {
      if (index != 0)
        nameSplited[index] = item.charAt(0).toUpperCase() + item.slice(1);
    });

    let newName = nameSplited.join("");

    const synced = [...eval(newName + "Items")];

    if (synced.indexOf(value) == -1 && value != "") {
      synced[index] = value;
    }

    eval("set" + newName.charAt(0).toUpperCase() + newName.slice(1) + "Items")(
      synced
    );

    return synced;
  }

  function doRemoveItems(name) {
    let nameSplited = name.split("_");

    nameSplited.map((item, index) => {
      if (index != 0)
        nameSplited[index] = item.charAt(0).toUpperCase() + item.slice(1);
    });

    let newName = nameSplited.join("");

    const newColorCodeItems = [];

    eval("set" + newName.charAt(0).toUpperCase() + newName.slice(1) + "Items")(
      newColorCodeItems
    );

    productFields[name] = newColorCodeItems;
    setProductFields({
      ...productFields,
    });
  }

  function addField(fields) {
    fields.map((item) => {
      let nameSplited = item.split("_");

      nameSplited.map((item, index) => {
        if (index != 0)
          nameSplited[index] = item.charAt(0).toUpperCase() + item.slice(1);
      });

      let newName = nameSplited.join("");

      eval(
        "set" + newName.charAt(0).toUpperCase() + newName.slice(1) + "Items"
      )([...eval(newName + "Items"), ""]);
    });
  }

  function removeField(fields, id) {
    fields.map((item) => {
      let nameSplited = item.split("_");

      nameSplited.map((item, index) => {
        if (index != 0)
          nameSplited[index] = item.charAt(0).toUpperCase() + item.slice(1);
      });

      let newName = nameSplited.join("");

      const newItems = eval(newName + "Items").filter(
        (item, index) => index !== id
      );

      eval(
        "set" + newName.charAt(0).toUpperCase() + newName.slice(1) + "Items"
      )(newItems);

      productFields[item] = newItems;
      setProductFields({
        ...productFields,
      });
    });
  }

  function setValue(e, index = null) {
    const target = e.target;
    const name = target.name;
    let value;

    if (name == "product_image") {
      const files = Array.prototype.slice.call(target.files);
      value = doAddFiles(name, files);
    } else if (name == "color_code" || name == "color_name") {
      const item = target.value;
      value = doAddItem(name, item);
    } else if (name == "status_available") {
      value = target.checked;
    } else if (
      name == "sizep" ||
      name == "sizel" ||
      name == "sizet" ||
      name == "price"
    ) {
      const item = target.value;
      value = doSyncItem(name, item, index);
    } else {
      value = target.value;
    }

    setProductFields({
      ...productFields,
      [name]: value,
    });
  }

  return (
    <>
      <AdminHook title={"Add Product"}>
        <ProductForm
          type="add"
          setValue={setValue}
          doSave={doSave}
          progress={progress}
          productFields={productFields}
          setProductFields={setProductFields}
          fileCountLimit={fileCountLimit}
          productImageFiles={productImageFiles}
          setProductImageFiles={setProductImageFiles}
          doRemoveFile={doRemoveFile}
          colorCodeItems={colorCodeItems}
          colorCode={colorCode}
          setColorCode={setColorCode}
          colorNameItems={colorNameItems}
          colorName={colorName}
          setColorName={setColorName}
          doRemoveItems={doRemoveItems}
          sizepItems={sizepItems}
          sizelItems={sizelItems}
          sizetItems={sizetItems}
          priceItems={priceItems}
          addField={addField}
          removeField={removeField}
          products={products}
          productCategories={productCategories}
        />
      </AdminHook>
    </>
  );
};

export async function getStaticProps(context) {
  return { props: { isHome: true } };
}

export default AddProduct;
