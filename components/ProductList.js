import React from 'react'
import Link from "next/link";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import {deleteProduct} from "../redux/features/productSlice";

const ProductList = ({item, doShowModal}) => {
    const dispatch = useDispatch();

    function doDelete(id, e) {
        Swal.fire({
            icon: 'info',
            title: 'Are you sure...?!',
            text: `Delete product with id ${id}`,
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id))
                    .then((payload) => {
                        if (payload.meta.requestStatus === "fulfilled") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: `Product id ${id} has been deleted`
                            });
                        }
                    });
            }
        });
    }

    return (
        <>
            <tr>
                <td><img
                    src={(item.cover_square_image) ?? `https://dummyimage.com/100x100/c785c7/ffffff.png&text=No+Image`}/>
                </td>
                <td><strong>{item.product_code}</strong><br />{item.product_name}</td>
                <td>{item.status_available}</td>
                <td>
                    <Button variant="primary" className={`mb-2 mr-2`} onClick={() => doShowModal(item.id)}>
                        Preview
                    </Button>
                    <Link href={`/product-category/${item.id}/edit`}>
                        <button type="button"
                                className="btn btn-warning mb-2  mr-2">Edit
                        </button>
                    </Link>
                    <button type="button"
                            className="btn btn-danger mb-2"
                            onClick={() => { doDelete(item.id) }}>Delete
                    </button>
                </td>
            </tr>
        </>
    )
}

export default ProductList
