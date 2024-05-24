import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import LessonItem from './LessonItem';
import { useLazyGetAllCourseLessonsQuery } from 'store/reducer/api';
import Spinner from 'components/common/Spinner';
import EmptyItems from '../common/EmptyItems';
import { useTranslation } from 'react-i18next';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { updateCourseDetailLessons } from 'store/reducer/course';
import _ from 'lodash';

interface DnDWrapperProps {
  children: ReactNode;
}

const DnDWrapper: FC<DnDWrapperProps> = ({
  children,
}: DnDWrapperProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-full h-fit max-h-full flex flex-col gap-5 rounded-b overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded py-2'>
        {children}
      </div>
    </DndProvider>
  );
};

const Lessons = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { courseDetail } = useAppSelector((state) => state.course);
  const lessons = courseDetail.lessons ?? [];
  const [getLessons, { isLoading, isFetching }] =
    useLazyGetAllCourseLessonsQuery();

  useEffect(() => {
    getLessons({ course_id: courseDetail.id });
  }, []);

  const handleDrop = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const courseLessons = _.cloneDeep(lessons);
      const [movingLesson] = courseLessons.splice(dragIndex, 1);
      courseLessons.splice(hoverIndex, 0, movingLesson);
      dispatch(updateCourseDetailLessons(courseLessons));
    },
    [lessons],
  );

  return (
    <DnDWrapper>
      {isFetching || isLoading ? (
        <Spinner />
      ) : lessons.length ? (
        lessons.map((lesson, idx) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            position={idx}
            course_id={courseDetail.id}
            title={lesson.title}
            handleDrop={handleDrop}
          />
        ))
      ) : (
        <EmptyItems message={t('lesson.no_lesson_found_add_one')} />
      )}
    </DnDWrapper>
  );
};

export default Lessons;
