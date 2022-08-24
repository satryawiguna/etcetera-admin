import AdminHook from "../../../components/layouts/admin.hook";
import ProductForm from "../../../components/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  productSelectors,
  updateProduct,
} from "../../../redux/features/productSlice";
import { useRouter } from "next/router";
import { useState } from "react";

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    productSelectors.selectById(state, parseInt(props.id))
  );
  const router = useRouter();

  const [productFields, setProductFields] = useState();
  const [progress, setProgress] = useState();

  useEffect(() => {
    setProductFields({
      code: product.code,
      cover_image: product.cover_image,
      cover_square_image: product.cover_square_image,
      product_image: product.product_image,
      product_name: product.product_name,
      composition_cate: product.composition_care,
      description: product.description,
      status_available: product.status_available,
      category: product.category,
      sku: product.sku,
      color_code: product.color_code,
      color_name: product.color_name,
      sizel: product.sizel,
      sizep: product.sizep,
      sizet: product.sizet,
      price: product.price,
      volume_unit: product.volume_unit,
    });
  }, [product]);

  async function doUpdate() {
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

      dispatch(updateProduct({ id: props.id, data: formData })).then(
        (payload) => {
          if (payload.meta.requestStatus === "fulfilled") {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: `${payload.payload}`,
            }).then((result) => {
              router.push("/product");
            });
          } else if (payload.meta.requestStatus === "rejected") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${payload.payload.message}`,
            }).then((result) => {
              router.push("/product");
            });
          }
        }
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
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

    console.log(productFields);
  }

  return (
    <div>
      <AdminHook title={"Edit Product"}>
        <ProductForm
          type="edit"
          doUpdate={doUpdate}
          setValue={setValue}
          progress={progress}
          product={product}
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
    </div>
  );
};

export async function getServerSideProps(context) {
  return { props: { id: context.query.id, isHome: true } };
}

export default EditProduct;
