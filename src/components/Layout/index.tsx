import CourseReviewsModal from 'components/common/course/CourseReviewsModal';
import NewCourse from 'components/common/course/NewCourse';
import { ReactNode } from 'react';
import { useAppSelector } from 'store';

const Layout = ({ children }: { readonly children: ReactNode }) => {
  const {
    isNewCourseModalOpened,
    reviews: { isReviewsModalOpened },
  } = useAppSelector((state) => state.course);
  return (
    <div className='w-11/12 sm:w-5/6 h-5/6 sm:4/5 flex flex-col items-center relative'>
      {children}
      {isNewCourseModalOpened && <NewCourse />}
      {isReviewsModalOpened && <CourseReviewsModal />}
    </div>
  );
};

export default Layout;
