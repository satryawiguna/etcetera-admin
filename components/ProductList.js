import React from 'react'
import Link from "next/link";

const ProductList = ({ item }) => {
    return (
        <>
            <tr>
                <td>
                </td>
                <td>
                    <Link href={`/product-category/${item.id}`}>
                        <button type="button"
                                className="btn btn-primary mb-2 mr-2">Preview
                        </button>
                    </Link>
                    <Link href={`/product-category/${item.id}/edit`}>
                        <button type="button"
                                className="btn btn-warning mb-2  mr-2">Edit
                        </button>
                    </Link>
                    <Link href={`/product-category/${item.id}/delete`}>
                        <button type="button"
                                className="btn btn-danger mb-2">Delete
                        </button>
                    </Link>
                </td>
            </tr>
        </>
    )
}

export default ProductList
