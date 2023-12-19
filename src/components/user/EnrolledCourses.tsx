import Spinner from 'components/Spinner';
import CoursesContentWrapper from 'components/common/CoursesContentWrapper';
import EmptyItems from 'components/common/EmptyItems';
import CourseItem from 'components/common/course/CourseItem';
import { useEffect } from 'react';
import { useAppSelector } from 'store';
import { useLazyGetUserEnrolledCoursesQuery } from 'store/reducer/api';
import ViewCourseModal from './ViewCourseModal';

const EnrolledCourses = () => {
  const [getUserEnrolledCourses, { isFetching, isLoading }] =
    useLazyGetUserEnrolledCoursesQuery();
  const isFetchingOrLoading = isFetching || isLoading;
  const { enrolledCourses, showEnrolledCourseModal } = useAppSelector(
    (state) => state.course
  );

  useEffect(() => {
    getUserEnrolledCourses(null);
  }, []);

  return (
    <>
      {isFetchingOrLoading ? (
        <Spinner />
      ) : enrolledCourses.length ? (
        <CoursesContentWrapper>
          {enrolledCourses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </CoursesContentWrapper>
      ) : (
        <EmptyItems message="You've enrolled in any course yet." />
      )}
      {showEnrolledCourseModal && <ViewCourseModal />}
    </>
  );
};

export default EnrolledCourses;
