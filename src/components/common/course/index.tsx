import { useEffect } from 'react';
import { MdHourglassEmpty } from 'react-icons/md';
import { useAppSelector } from 'store';
import { useLazyGetAllCourseQuery } from 'store/reducer/api';
import Spinner from '../../Spinner';
import CourseDetails from 'components/common/course/CourseDetails';
import CourseItem from 'components/common/course/CourseItem';

const Courses = () => {
  const { courses, showCourseDetail } = useAppSelector(
    (state) => state.course
  );
  const [getAllCourse, { isFetching, isLoading }] =
    useLazyGetAllCourseQuery();

  useEffect(() => {
    getAllCourse();
  }, []);

  return (
    <>
      {isLoading || isFetching ? (
        <Spinner />
      ) : courses.length ? (
        <div className='w-full h-full bg-gray-200/50 rounded-t grid grid-rows-none sm:grid-rows-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-36 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-track-rounded scrollbar-thumb-rounded'>
          {courses.map((course, idx) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className='w-full h-full text-2xl font-semibold flex items-center justify-center gap-2'>
          <MdHourglassEmpty />
          You've not created any course yet.
        </div>
      )}
      {showCourseDetail && <CourseDetails />}
    </>
  );
};

export default Courses;
