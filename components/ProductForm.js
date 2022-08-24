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

    if (props.product) {
        props.setProductImageFiles(props.product.product_image);
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
                            defaultValue={(props.product) ? props.product.code : ""}
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
                                    disabled={props.progress || props.fileCountLimit}
                                    accept="application/jpg, application/jpeg, image/png"
                                    multiple
                                />
                                <label className="custom-file-label" htmlFor="image">
                                    Choose file
                                </label>
                            </div>
                        </div>
                    </div>
                    {(props.productImageFiles.length > 0) ? (
                        <div className="form-group">
                            <div className="card bg-light d-flex flex-fill">
                                <div className="card-body p-2">
                                    <div className="row">
                                        <div className="col-12 d-flex flex-column">
                                            {props.productImageFiles.map((item, index) => (
                                            <div key={index} className="mb-2">
                                                <img src={item.url} height="30" />
                                                {item.file.name}
                                                <button type="button" className="btn btn-danger btn-sm float-right" onClick={() => props.doRemoveFile("product_image", item)}>Remove</button>
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
                        <label>Description</label>
                        <textarea className="form-control"
                                name="description"
                                rows="3"
                                placeholder="Description..."
                                onChange={props.setValue}
                                disabled={props.progress}
                                defaultValue={(props.product) ? props.product.description : ""}></textarea>
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-switch">
                            <input type="checkbox" 
                                name="status_available" 
                                className="custom-control-input" 
                                onChange={props.setValue} 
                                id="status_available" />
                            <label className="custom-control-label" htmlFor="status_available">Status Available</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <Select options={categories}
                                closeMenuOnSelect={false}
                                isSearchable={true}
                                isMulti
                                defaultValue={(props.product) ? props.product.category_id : ""}/>
                    </div>
                    <div className="form-group">
                        <label>SKU</label>
                        <Select options={products}
                                closeMenuOnSelect={false}
                                isSearchable={true}
                                isMulti/>
                    </div>
                    <div className="form-group">
                        <div className="row m-0 p-0">
                            <div className="col-md-6 m-0 p-0 pr-2">
                                <label htmlFor="color_code">Color Code</label>
                                <div className="input-group mb-2">
                                    <input
                                        type="color"
                                        className="form-control"
                                        onChange={(e) => props.setColorCode(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button type="button" name="color_code" className="input-group-text bg-blue btn" onClick={props.setValue} value={props.colorCode}>
                                            Add Color
                                        </button>
                                    </div>
                                </div>
                                {(props.colorCodeItems.length > 0) ? (
                                    <>
                                        <div className="form-group">
                                            <div className="card bg-light d-flex flex-fill">
                                                <div className="card-body p-2">
                                                    <div className="row">
                                                        <div className="col-12 d-flex flex-row">
                                                            {props.colorCodeItems.map((item, index) => (
                                                                <div key={index} className={"mr-1"} style={{width: 25, height: 25, backgroundColor: item}}></div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#/" onClick={() => props.doRemoveItems("color_code")}>Clear All</a>
                                        </div>
                                    </>
                                ) : ("")}
                            </div>
                            <div className="col-md-6 m-0 p-0 pl-2">
                                <label htmlFor="color_name">Color Name</label>
                                <div className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => props.setColorName(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button type="button" name="color_name" className="input-group-text bg-blue btn" onClick={props.setValue} value={props.colorName}>
                                            Add Color
                                        </button>
                                    </div>
                                </div>
                                {(props.colorNameItems.length > 0) ? (
                                    <>
                                        <div className="form-group">
                                            <div className="bg-light d-flex flex-fill">
                                                <div className="p-2 pl-0">
                                                    <div className="row pl-0">
                                                        <div className="col-12 d-flex flex-row pl-0">
                                                            {props.colorNameItems.map((item, index) => (
                                                                <span key={index} className="badge bg-danger mr-1 pl-3 pr-3 pt-2 pb-2">{item}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#/" onClick={() => props.doRemoveItems("color_name")}>Clear All</a>
                                        </div>
                                    </>
                                ) : ("")}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row m-0 p-0">
                            <div className="col-md-3 m-0 p-0 pr-2">
                                <label htmlFor="sizep">Size (Long)</label>
                                {props.sizepItems.map((item, index) => {
                                    return (
                                        <input type="text"
                                            key={index} 
                                            className="form-control mb-2"
                                            name="sizep"
                                            placeholder="Enter size (Long)"
                                            onChange={(e) => props.setValue(e, index)}
                                            disabled={props.progress}
                                            defaultValue={item} />
                                    )
                                    
                                })}
                            </div>
                            <div className="col-md-3 m-0 p-0 pr-2">
                                <label htmlFor="sizel">Size (Width)</label>
                                {props.sizelItems.map((item, index) => {
                                    return (
                                        <input type="text"
                                            key={index} 
                                            className="form-control mb-2"
                                            name="sizel"
                                            placeholder="Enter size (width)"
                                            onChange={(e) => props.setValue(e, index)}
                                            disabled={props.progress}
                                            defaultValue={item} />
                                    )
                                })}
                            </div>
                            <div className="col-md-3 m-0 p-0 pr-2">
                                <label htmlFor="sizet">Size (Height)</label>
                                {props.sizetItems.map((item, index) => {
                                    return (
                                        <input type="text"
                                            key={index} 
                                            className="form-control mb-2"
                                            name="sizet"
                                            placeholder="Enter size (width)"
                                            onChange={(e) => props.setValue(e, index)}
                                            disabled={props.progress}
                                            defaultValue={item} />
                                    )
                                    
                                })}
                            </div>
                            <div className="col-md-3 m-0 p-0" align="right">
                                <label htmlFor="add_size">&nbsp;</label>
                                {props.sizepItems.map((item, index) => {
                                    if (index < 1) {
                                        return (<button type="button" 
                                            key={index} 
                                            name="add_size" 
                                            className="input-group-text bg-blue btn mb-2"
                                            onClick={() => props.addField(["sizep", "sizel", "sizet"])}>
                                            Add Size
                                        </button>)
                                    } else {
                                        return (<button type="button" 
                                            key={index} 
                                            name="remove_size" 
                                            className="input-group-text bg-danger btn mb-2"
                                            onClick={() => props.removeField(["sizep", "sizel", "sizet"], index)}>
                                            Remove Size
                                        </button>)
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row m-0 p-0">
                            <div className="col-md-9 m-0 p-0 pr-2">
                                <label htmlFor="price">Price</label>
                                {props.priceItems.map((item, index) => {
                                    return (
                                        <input type="text"
                                            key={index} 
                                            className="form-control mb-2"
                                            name="price"
                                            placeholder="Enter price"
                                            onChange={(e) => props.setValue(e, index)}
                                            disabled={props.progress}
                                            defaultValue={item} />
                                    )
                                })}
                            </div>
                            <div className="col-md-3 m-0 p-0" align="right">
                                <label htmlFor="add_price">&nbsp;</label>
                                {props.priceItems.map((item, index) => {
                                    if (index < 1) {
                                        return (<button type="button" 
                                            key={index} 
                                            name="add_price" 
                                            className="input-group-text bg-blue btn mb-2"
                                            onClick={() => props.addField(["price"])}>
                                            Add Price
                                        </button>)
                                    } else {
                                        return (<button type="button" 
                                            key={index} 
                                            name="remove_price" 
                                            className="input-group-text bg-danger btn mb-2"
                                            onClick={() => props.removeField(["price"], index)}>
                                            Remove Price
                                        </button>)
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="composition_care">Volume Unit</label>
                        <input
                            type="text"
                            className="form-control"
                            name="volume_unit"
                            placeholder="Enter volume unit"
                            onChange={props.setValue}
                            disabled={props.progress}
                            defaultValue={(props.product) ? props.product.volume_unit : ""}
                        />
                    </div>
                    <div className="card-footer">
                        <Link href={ `/product-category` }>
                            <button type="button" className="btn btn-default mb-2 mr-2">Cancel</button>
                        </Link>
                        <button type="submit" className="btn btn-primary mb-2">
                            {(props.type === "add") ? ( "Save" ) : ( "Update" )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ProductForm
