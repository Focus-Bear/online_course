import { useEffect } from 'react';
import { useAppSelector } from 'store';
import {
  useLazyGetAdminCoursesQuery,
  useLazyGetUserCoursesQuery,
} from 'store/reducer/api';
import Spinner from '../common/Spinner';
import CourseDetails from 'components/course/CourseDetails';
import CourseItem from 'components/course/CourseItem';
import CoursesContentWrapper from '../common/CoursesContentWrapper';
import EmptyItems from '../common/EmptyItems';
import { decrement } from 'utils/support';
import { DEFAULT_COURSE_PAGE } from 'constants/general';

const Courses = () => {
  const {
    course: { courses: userCourses, showCourseDetail, adminCourses },
    user: { isAdmin },
    setting: { currentPage },
  } = useAppSelector((state) => state);
  const [
    getAdminCourses,
    {
      isFetching: isAdminCoursesFetching,
      isLoading: isAdminCoursesLoading,
    },
  ] = useLazyGetAdminCoursesQuery();
  const [
    getUserCourses,
    { isFetching: isUserCoursesFetching, isLoading: isUserCoursesLoading },
  ] = useLazyGetUserCoursesQuery();
  const isFetchingOrLoading =
    isUserCoursesFetching ||
    isUserCoursesLoading ||
    isAdminCoursesFetching ||
    isAdminCoursesLoading;
  const { take } = adminCourses.meta;
  const courses = isAdmin
    ? adminCourses.data.slice(
        decrement(currentPage) * take,
        decrement(currentPage * take),
      )
    : userCourses;

  useEffect(() => {
    isAdmin
      ? getAdminCourses({ page: DEFAULT_COURSE_PAGE })
      : getUserCourses();
  }, []);

  return (
    <>
      {isFetchingOrLoading ? (
        <Spinner />
      ) : courses.length ? (
        <CoursesContentWrapper>
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </CoursesContentWrapper>
      ) : (
        <EmptyItems />
      )}
      {showCourseDetail && <CourseDetails />}
    </>
  );
};

export default Courses;
