import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import CreatedTodos from '../Todos/CreatedTodos/CreatedTodos';
import "./Pagination/Paginate.scss";



export default function Paginate({items, itemsPerPage, handleDelete, notify, isEdit, handleEdit}) {

  
const [currentItems, setCurrentItems] = useState(null);
const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
const [itemOffset, setItemOffset] = useState(0);

useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
    // console.warn(items)
  },[items]);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      <CreatedTodos currentItems={currentItems} handleDelete={handleDelete} notify={notify} isEdit={isEdit} handleEdit={handleEdit}/>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />
    </>
  )
}
