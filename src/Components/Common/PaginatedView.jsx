import { useState } from "react"
import ReactPaginate from "react-paginate"

import "./PaginatedView.css"

export default function PaginatedView({
  itemsPerPage = 10,
  itemContainerClassName = "",
  children,
}) {
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage
  const currentItems = children.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(children.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % children.length
    setItemOffset(newOffset)
  }

// Function responsible for refreshing the items on the page
const RefreshedItems = ({ currentItems = [] }) => {
    return currentItems.map((item, index) => {
      return <span key={index}>{item}</span>;
    });
  };
  

  return (
    <>
      <div className="paginated-view" >
        <div className={itemContainerClassName}>
          <RefreshedItems currentItems={currentItems} />
        </div>
      </div>
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  )
}
