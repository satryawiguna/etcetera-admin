import React, {useEffect, useState} from 'react'
import PageList from "./PageList";
import {useDispatch} from "react-redux";
import {fetchProductCategories} from "../redux/features/productCategorySlice";

const Page = ({items}) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const page = {
        total: (items.length - 2),
        currentPage: currentPage,
        setCurrentPage: setCurrentPage
    }

    useEffect(() => {
        dispatch(fetchProductCategories({
            params: {
                page: currentPage
            }
        }))
    }, [currentPage])

    return (
      <ul className="pagination pagination-sm m-0 float-right">
        {
            items && items.length > 0 ?
                items.map((item, index) => (
                  <PageList
                    key={index}
                    item={item}
                    page={page}/>
              )) : ("")
        }
      </ul>
    )
}

export default Page
