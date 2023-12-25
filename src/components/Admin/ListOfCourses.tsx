import EmptyItems from 'components/common/EmptyItems';
import Courses from 'components/common/course';
import CourseItem from 'components/common/course/CourseItem';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from 'store';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }: any) {
  return (
    <>
      {currentItems &&
        currentItems.map((item: any) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

const ListOfCourses = () => {
  const { courses } = useAppSelector((state) => state.course);
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Courses />
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel='< previous'
        renderOnZeroPageCount={null}
        breakClassName={'page-item'}
        containerClassName={'flex items-center gap-2'}
        pageClassName={'bg-blue-200 px-2 rounded'}
        nextLinkClassName={
          'bg-gray-500 hover:bg-gray-600 disable:bg-gray-400 text-white rounded px-2 py-0.5'
        }
        previousLinkClassName={
          'bg-gray-500 hover:bg-gray-600 disable:bg-gray-400 text-white rounded px-2 py-0.5 leading-3'
        }
        previousClassName=''
        activeClassName={'bg-blue-600 text-white'}
      />
    </>
  );
};

export default ListOfCourses;
