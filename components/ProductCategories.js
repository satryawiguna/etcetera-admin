import React, {useState} from 'react'
import ProductCategoryList from "./ProductCategoryList";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useDispatch, useSelector} from "react-redux";
import {productCategorySelectors} from "../redux/features/productCategorySlice";

const ProductCategories = ({items}) => {
  const dispatch = useDispatch();
  const productCategory = useSelector((state) => productCategorySelectors.selectById(state, 3));

  const [show, setShow] = useState(false);

  function doCloseModal() {
    setShow(false);
  }

  function doShowModal() {
    setShow(true);
  }

  return (
    <>
      <Modal show={show} onHide={doCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={doCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={doCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {
        items && items.length > 0 ? (
            items.map(item => (
              <ProductCategoryList
                key={item.id}
                item={item}
                doShowModal={doShowModal} />
            ))
        ) : ("")
      }
    </>
  )
}

export default ProductCategories;
