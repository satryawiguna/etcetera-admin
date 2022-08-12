import React from 'react'
import Link from "next/link";
import Select from 'react-select';

const ProductForm = (props) => {
    const categories = props.productCategories.map(item => {
        return {
            value: item.id,
            label: item.name
        }
    });

    const products = props.products.map(item => {
        return {
            value: item.id,
            label: item.name
        }
    });

    const color_name = [
        {
            value: "red",
            label: "Red"
        },
        {
            value: "yellow",
            label: "Yellow"
        },
        {
            value: "green",
            label: "Green"
        }
    ]

    const color_code = [
        {
            value: "red",
            label: "Red"
        },
        {
            value: "yellow",
            label: "Yellow"
        },
        {
            value: "green",
            label: "Green"
        }
    ]

    function removeUploadedFiles(item) {
        const newUploadedFiles = props.uploadedFiles.filter(uploadFile => uploadFile.url !== item.url);

        props.setUploadedFiles(newUploadedFiles)
        props.productFields.product_image = newUploadedFiles;
        props.setProductFields({
            ...props.productFields
        });
    }

    function clearAllColorCodes() {
        const newColorCodes = [];

        props.setColorCodes(newColorCodes)
        props.productFields.color_code = newColorCodes;
        props.setProductFields({
            ...props.productFields
        })
    }

    return (
        <>
            <form onSubmit={(props.type === "add") ? props.doSave : props.doUpdate }>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="code">Code</label>
                        <input
                            type="text"
                            className="form-control"
                            name="code"
                            placeholder="Enter code"
                            onChange={props.setValue}
                            disabled={props.progress}
                            defaultValue={(props.product) ? props.product.name : ""}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cover_image">Cover Image</label>
                        <div className="input-group">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    name="cover_image"
                                    onChange={props.setValue}
                                    disabled={props.progress}
                                />
                                <label className="custom-file-label" htmlFor="image">
                                    Choose file
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cover_square_image">Cover Square Image</label>
                        <div className="input-group">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    name="cover_square_image"
                                    onChange={props.setValue}
                                    disabled={props.progress}
                                />
                                <label className="custom-file-label" htmlFor="image">
                                    Choose file
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_image">Product Image</label>
                        <div className="input-group">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    name="product_image"
                                    onChange={props.setValue}
                                    disabled={props.progress || props.fileLimit}
                                    accept="application/jpg, application/jpeg, image/png"
                                    multiple
                                />
                                <label className="custom-file-label" htmlFor="image">
                                    Choose file
                                </label>
                            </div>
                        </div>
                    </div>
                    {(props.uploadedFiles.length > 0) ? (
                        <div className="form-group">
                            <div className="card bg-light d-flex flex-fill">
                                <div className="card-body p-2">
                                    <div className="row">
                                        <div className="col-12 d-flex flex-column">
                                            {props.uploadedFiles.map((item, index) => (
                                            <div key={index} className="mb-2">
                                                <img src={item.url} height="30" />
                                                {item.file.name}
                                                <button type="button" className="btn btn-danger btn-sm float-right" onClick={() => removeUploadedFiles(item)}>Remove</button>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ("")}
                    <div className="form-group">
                        <label htmlFor="code">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="product-name"
                            placeholder="Enter code"
                            onChange={props.setValue}
                            disabled={props.progress}
                            defaultValue={(props.product) ? props.product.product_name : ""}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="composition_care">Composition Care</label>
                        <input
                            type="text"
                            className="form-control"
                            name="composition_care"
                            placeholder="Enter composition care"
                            onChange={props.setValue}
                            disabled={props.progress}
                            defaultValue={(props.product) ? props.product.composition_care : ""}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <Select options={categories}
                                closeMenuOnSelect={false}
                                isSearchable={true}
                                isMulti/>
                    </div>
                    <div className="form-group">
                        <label>SKU</label>
                        <Select options={products}
                                closeMenuOnSelect={false}
                                isSearchable={true}
                                isMulti/>
                    </div>
                    <div className="form-group">
                        <label>Color Name</label>
                        <Select options={color_name}
                                closeMenuOnSelect={false}
                                isSearchable={true}
                                isMulti/>
                    </div>
                    <div className="form-group">
                        <label>Color Code</label>
                        <Select options={color_name}
                                closeMenuOnSelect={false}
                                isSearchable={true}
                                isMulti/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="color_code">Color Code</label>
                        <div className="input-group">
                            <input
                                type="color"
                                className="form-control"
                                placeholder="Enter color"
                                onChange={(e) => props.setAddColor(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button type="button" name="color_code" className="input-group-text bg-blue btn" onClick={props.setValue} value={props.addColor}>
                                    Add Color
                                </button>
                            </div>
                        </div>
                    </div>
                    {(props.colorCodes.length > 0) ? (
                        <>
                            <div className="form-group">
                                <div className="card bg-light d-flex flex-fill">
                                    <div className="card-body p-2">
                                        <div className="row">
                                            <div className="col-12 d-flex flex-row">
                                                {props.colorCodes.map((item, index) => (
                                                    <div key={index} className={"mr-1"} style={{width: 25, height: 25, backgroundColor: item}}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" onClick={() => clearAllColorCodes()}>Clear All</a>
                            </div>
                            
                        </>
                    ) : ("")}
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control"
                                  name="description"
                                  rows="3"
                                  placeholder="Description..."
                                  onChange={props.setValue}
                                  disabled={props.progress}
                                  defaultValue={(props.productCategory) ? props.productCategory.description : ""}></textarea>
                    </div>

                </div>
                <div className="card-footer">
                    <Link href={ `/product-category` }>
                        <button type="button" className="btn btn-default mb-2 mr-2">Cancel</button>
                    </Link>
                    <button type="submit" className="btn btn-primary mb-2">
                        {(props.type === "add") ? ( "Save" ) : ( "Update" )}
                    </button>
                </div>
            </form>
        </>
    )
}

export default ProductForm
