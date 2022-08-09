import React, {useEffect} from 'react'
import he from "he";

const PageList = ({item, page}) => {
    function goToPage(index) {
        if (typeof index === "string" && index.includes("Previous")) {
            if (page.currentPage > 1) {
                page.setCurrentPage(parseInt(page.currentPage) - 1);
            }
        } else if (typeof index === "string" && index.includes("Next")) {
            if (page.currentPage < page.total) {
                page.setCurrentPage(parseInt(page.currentPage) + 1);
            }
        } else if (!index.includes("Previous") && !index.includes("Next")){
            page.setCurrentPage(parseInt(index));
        }
    }

    return (
        <li className="page-item">
            <a className="page-link"
               href={undefined} onClick={() => goToPage(item.label)}>{he.decode(item.label)}</a>
        </li>
    )
}

export default PageList
