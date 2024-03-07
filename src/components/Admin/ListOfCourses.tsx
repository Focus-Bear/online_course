import OverlaySpinner from 'components/common/OverlaySpinner';
import Courses from 'components/course';
import { COURSE_PER_PAGE, DEFAULT_COURSE_PAGE } from 'constants/general';
import { t } from 'i18next';
import ReactPaginate from 'react-paginate';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazyGetAdminCoursesQuery } from 'store/reducer/api';
import { updateCurrentPage } from 'store/reducer/setting';
import { increment } from 'utils/support';

const ListOfCourses = () => {
  const dispatch = useAppDispatch();
  const {
    course: {
      adminCourses: {
        data,
        meta: { hasNextPage, pageCount },
      },
    },
    setting: { currentPage },
  } = useAppSelector((state) => state);
  const [
    getAdminCourses,
    {
      isFetching: isAdminCoursesFetching,
      isLoading: isAdminCoursesLoading,
    },
  ] = useLazyGetAdminCoursesQuery();

  const handlePageClick = ({ selected }: { selected: number }) => {
    const page = increment(selected);
    if (currentPage !== page) {
      hasNextPage && getAdminCourses({ page });
      dispatch(updateCurrentPage(page));
    }
  };

  return (
    <>
      <Courses />
      {data?.length ? (
        <ReactPaginate
          breakLabel='...'
          nextLabel={`${t('next')} >`}
          onPageChange={handlePageClick}
          pageRangeDisplayed={COURSE_PER_PAGE}
          pageCount={pageCount}
          previousLabel={`< ${t('previous')}`}
          renderOnZeroPageCount={null}
          breakClassName={'page-item'}
          containerClassName={'flex items-center gap-2 my-2'}
          pageClassName={'bg-blue-200 px-2 rounded'}
          nextLinkClassName={`${
            hasNextPage
              ? 'bg-gray-500 hover:bg-gray-600 cursor-pointer'
              : 'bg-gray-400 cursor-default'
          } text-white rounded px-2 py-0.5`}
          previousLinkClassName={`${
            currentPage === DEFAULT_COURSE_PAGE
              ? 'bg-gray-400 cursor-default'
              : 'bg-gray-500 hover:bg-gray-600 cursor-pointer'
          } text-white rounded px-2 py-0.5 leading-3`}
          activeClassName={'bg-blue-600 text-white'}
        />
      ) : null}
      {(isAdminCoursesFetching || isAdminCoursesLoading) && (
        <OverlaySpinner />
      )}
    </>
  );
};

export default ListOfCourses;
