import { useEffect } from 'react';
import { useAppSelector } from 'store';
import LessonItem from './LessonItem';
import { useLazyGetAllCourseLessonsQuery } from 'store/reducer/api';
import Spinner from 'components/Spinner';

const Lesson = () => {
  const { course: course_detail } = useAppSelector(
    (state) => state.course
  );
  const lessons = course_detail?.lessons ?? [];
  const [getLessons, { isLoading, isFetching }] =
    useLazyGetAllCourseLessonsQuery();

  useEffect(() => {
    getLessons(course_detail.id);
  }, []);

  return (
    <div className='w-full min-h-[4rem] h-fit max-h-full flex flex-col gap-5 rounded-b overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded'>
      {isFetching || isLoading ? (
        <Spinner />
      ) : lessons.length ? (
        lessons.map((lesson, idx) => (
          <LessonItem key={idx} lesson={lesson} position={idx} />
        ))
      ) : (
        <div className='w-fit h-fit text-sm font-medium self-center py-10 '>
          No lesson found, please add one.
        </div>
      )}
    </div>
  );
};

export default Lesson;
