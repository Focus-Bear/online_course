import Spinner from 'components/common/Spinner';
import CoursesContentWrapper from 'components/common/CoursesContentWrapper';
import EmptyItems from 'components/common/EmptyItems';
import CourseItem from 'components/course/CourseItem';
import { useEffect } from 'react';
import { useAppSelector } from 'store';
import { useLazyGetUserEnrolledCoursesQuery } from 'store/reducer/api';
import ViewCourseModal from './ViewCourseModal';
import { t } from 'i18next';

const EnrolledCourses = () => {
  const [getUserEnrolledCourses, { isFetching, isLoading }] =
    useLazyGetUserEnrolledCoursesQuery();
  const isFetchingOrLoading = isFetching || isLoading;
  const { enrolledCourses, showEnrolledCourseModal } = useAppSelector(
    (state) => state.course,
  );

  useEffect(() => {
    getUserEnrolledCourses(null);
  }, []);

  return (
    <>
      {isFetchingOrLoading ? (
        <Spinner />
      ) : enrolledCourses?.length ? (
        <CoursesContentWrapper>
          {enrolledCourses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </CoursesContentWrapper>
      ) : (
        <EmptyItems
          message={t('lesson.youve_not_enrolled_in_any_course_yet')}
        />
      )}
      {showEnrolledCourseModal && <ViewCourseModal />}
    </>
  );
};

export default EnrolledCourses;
