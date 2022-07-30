import AdminHook from "../../components/layouts/admin.hook";
import Link from "next/link";

const AddProductCategory = () => {
    return (
        <div>
            <AdminHook title={"Add Product Category"}>
                <form>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputFile">Image</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="image"
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


export default AddProductCategory
