import { useEffect } from 'react';
import { useAppSelector } from 'store';
import LessonItem from './LessonItem';
import { useLazyGetAllCourseLessonsQuery } from 'store/reducer/api';
import Spinner from 'components/Spinner';
import EmptyItems from '../EmptyItems';

const Lesson = () => {
  const {
    course: { course: course_detail },
    user: { isAdmin },
  } = useAppSelector((state) => state);
  const lessons = course_detail?.lessons ?? [];
  const [getLessons, { isLoading, isFetching }] =
    useLazyGetAllCourseLessonsQuery();

  useEffect(() => {
    getLessons(course_detail.id);
  }, []);

  return (
    <div className='w-full min-h-[10rem] h-fit max-h-full flex flex-col gap-5 rounded-b overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded'>
      {isFetching || isLoading ? (
        <Spinner
          styles={
            isAdmin
              ? 'w-8 h-8 rounded-full border-t-2 border-black animate-spin'
              : undefined
          }
        />
      ) : lessons.length ? (
        lessons.map((lesson, idx) => (
          <LessonItem
            key={idx}
            lesson={lesson}
            position={idx}
            course_id={course_detail.id}
          />
        ))
      ) : (
        <EmptyItems message='No lesson found, please add one.' />
      )}
    </div>
  );
};

export default Lesson;
