import { useEffect } from 'react';
import ModalOverlay from 'components/common/ModalOverlay';
import ModalContentWrapper from 'components/common/ModalContentWrapper';
import { MODAL_TYPE } from 'constants/general';
import { useAppSelector } from 'store';
import { t } from 'i18next';
import EmptyItems from 'components/common/EmptyItems';
import { useLazyGetAllCourseLessonsQuery } from 'store/reducer/api';
import Spinner from 'components/common/Spinner';
import { COURSE_LESSONS_OPTION } from 'constants/enum';

const CourseHighlightsLessons = () => {
  const { courseHighlights } = useAppSelector((state) => state.course);
  const lessons = courseHighlights?.lessons ?? [];

  return (
    <div className='w-full h-fit max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 flex flex-col gap-3'>
      {lessons?.length ? (
        lessons.map((lesson) => (
          <p
            key={lesson.id}
            className='text-xs sm:text-sm font-semibold shadow py-2'
          >
            <span className='mr-2'>&#9758;</span>
            {lesson.title}
          </p>
        ))
      ) : (
        <EmptyItems message={t('lesson.no_lesson_found')} />
      )}
    </div>
  );
};

const CourseHighlights = () => {
  const { courseHighlights } = useAppSelector((state) => state.course);
  const [getLessons, { isLoading, isFetching }] =
    useLazyGetAllCourseLessonsQuery();

  useEffect(() => {
    courseHighlights &&
      getLessons({
        course_id: courseHighlights.id,
        where: COURSE_LESSONS_OPTION.COURSE_HIGHLIGHTS,
      });
  }, []);

  return (
    <ModalOverlay>
      <ModalContentWrapper
        title={courseHighlights?.name}
        modal={MODAL_TYPE.COURSE_HIGHLIGHT}
      >
        {isLoading || isFetching ? (
          <Spinner />
        ) : (
          <CourseHighlightsLessons />
        )}
      </ModalContentWrapper>
    </ModalOverlay>
  );
};

export default CourseHighlights;
