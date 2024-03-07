import { useEffect } from 'react';
import { useAppSelector } from 'store';
import LessonItem from './LessonItem';
import { useLazyGetAllCourseLessonsQuery } from 'store/reducer/api';
import Spinner from 'components/common/Spinner';
import EmptyItems from '../common/EmptyItems';
import { useTranslation } from 'react-i18next';

const Lessons = () => {
  const { t } = useTranslation();
  const { course: course_detail } = useAppSelector(
    (state) => state.course,
  );
  const lessons = course_detail?.lessons ?? [];
  const [getLessons, { isLoading, isFetching }] =
    useLazyGetAllCourseLessonsQuery();

  useEffect(() => {
    getLessons(course_detail.id);
  }, []);

  return (
    <div className='w-full h-fit max-h-full flex flex-col gap-5 rounded-b overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded py-2'>
      {isFetching || isLoading ? (
        <Spinner />
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
        <EmptyItems message={t('lesson.no_lesson_found')} />
      )}
    </div>
  );
};

export default Lessons;
