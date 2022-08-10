import React, {useState} from 'react'
import {productCategorySelectors} from "../redux/features/productCategorySlice";
import {useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProductList from "./ProductList";

const Products = ({items}) => {
    const [show, setShow] = useState(false);
    const [id, setId] = useState();

    function doCloseModal() {
        setShow(false);
    }

    function doShowModal(id) {
        setShow(true);
        setId(id);
    }

    return (
        <>
            <ProductModal
                doShowModal={doShowModal}
                doCloseModal={doCloseModal}
                show={show}
                id={id}/>

            {
                items && items.length > 0 ? (
                    items.map(item => (
                        <ProductList
                            key={item.id}
                            item={item}
                            doShowModal={doShowModal} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No data available</td>
                    </tr>
                )
            }
        </>
    )
}

const ProductModal = ({doShowModal, doCloseModal, show, id}) => {
    const productCategory = useSelector((state) => productCategorySelectors.selectById(state, id));

    return (
        <Modal show={show} onHide={doCloseModal}>
            <Modal.Header>
                <Modal.Title>Product Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <div className="col-sm-9">
                        <div className="mt-2">{(productCategory) ? productCategory.name : ""}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-9">
                        <div className="mt-2">{(productCategory) ? productCategory.description : ""}</div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={doCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Products;
