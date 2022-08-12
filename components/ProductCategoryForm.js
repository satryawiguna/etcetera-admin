import React from 'react'
import Link from "next/link";

const ProductCategoryForm = (props) => {
  return (
    <>
      <form onSubmit={(props.type === "add") ? props.doSave : props.doUpdate }>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter name"
                onChange={props.setValue}
                disabled={props.progress}
                defaultValue={(props.productCategory) ? props.productCategory.name : ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Image</label>
            <div className="input-group">
              <div className="custom-file">
                <input
                    type="file"
                    className="custom-file-input"
                    name="file"
                    onChange={props.setValue}
                    disabled={props.progress}
                    defaultValue={(props.productCategory) ? props.productCategory.image : ""}
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

export default ProductCategoryForm
