import React, {useState} from 'react'
import Link from "next/link";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {deleteProductCategory} from "../redux/features/productCategorySlice";
import Button from 'react-bootstrap/Button';

const ProductCategoryList = ({item, doShowModal}) => {
    const dispatch = useDispatch();

    function doDelete(id, e) {
        Swal.fire({
            icon: 'info',
            title: 'Are you sure...?!',
            text: `Delete product category with id ${id}`,
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProductCategory(id))
                    .then((payload) => {
                        if (payload.meta.requestStatus === "fulfilled") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: `Product category id ${id} has been deleted`
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
                    src={(item.image) ?? `https://dummyimage.com/100x100/c785c7/ffffff.png&text=No+Image`}/>
                </td>
                <td>{item.name}</td>
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

export default ProductCategoryList
