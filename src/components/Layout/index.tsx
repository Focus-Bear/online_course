import ConfirmModal from 'components/common/ConfirmModal';
import CourseReviewsModal from 'components/common/course/CourseReviewsModal';
import NewCourse from 'components/common/course/NewCourse';
import Navbar from 'components/common/Navbar';
import { ReactNode } from 'react';
import { useAppSelector } from 'store';

const Layout = ({ children }: { readonly children: ReactNode }) => {
  const {
    course: {
      isNewCourseModalOpened,
      reviews: { isReviewsModalOpened },
    },
    setting: { confirmModal },
  } = useAppSelector((state) => state);
  return (
    <div className='w-11/12 sm:w-5/6 h-5/6 sm:4/5 flex flex-col items-center relative'>
      <Navbar />
      {children}
      {isNewCourseModalOpened && <NewCourse />}
      {isReviewsModalOpened && <CourseReviewsModal />}
      {confirmModal.isOpen && <ConfirmModal />}
    </div>
  );
};

export default Layout;
