import ModalContentWrapper from 'components/common/ModalContentWrapper';
import ModalOverlay from 'components/common/ModalOverlay';
import {
  FIRST_LESSON_INDEX,
  FIRST_LESSON_OFFSET,
  ITEM_NOT_FOUND,
  MODAL_TYPE,
} from 'constants/general';

import { useCallback, useEffect, useRef, useState } from 'react';
import parser from 'html-react-parser';
import ReactPlayer from 'react-player/lazy';
import { OnProgressProps } from 'react-player/base';
import { useAppDispatch, useAppSelector } from 'store';
import { Lesson } from 'constants/interface';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { decrement, increment } from 'utils/support';
import {
  useCreateLessonCompetedMutation,
  useUpdateCourseEnrollmentMutation,
} from 'store/reducer/api';
import Cover from 'assets/images/bear.png';
import { DEFAULT_COURSE, DEFAULT_VIDEO_DURATION } from 'assets/default';
import { updateCourse } from 'store/reducer/course';
import { t } from 'i18next';

interface CarouselProps {
  lessons: Lesson[];
  course_id: string;
}

interface CourseLessonProps {
  lesson: Lesson;
  currentLesson: number;
}

interface FinishCourseItemProps {
  handleCourseCompletion: () => void;
}

const FinishCourseItem = ({
  handleCourseCompletion,
}: FinishCourseItemProps) => {
  return (
    <div className='min-w-full w-full h-[70vh] sm:h-[50vh] flex flex-col gap-3 items-center justify-center font-semibold'>
      <p className='text-xl'>{t('course.youve_completed_the_course')}</p>
      <button
        onClick={() => {
          handleCourseCompletion();
        }}
        className='w-fit h-fit px-2 py-1 bg-gray-600 hover:bg-gray-700 text-sm text-white rounded-md'
      >
        {t('course.back_to_enrolled_courses')}
      </button>
    </div>
  );
};

const CourseLesson = ({ lesson, currentLesson }: CourseLessonProps) => {
  const videoPlayer = useRef<ReactPlayer>(null);
  const [duration, setDuration] = useState(DEFAULT_VIDEO_DURATION);

  useEffect(() => {
    videoPlayer.current?.seekTo(0);
  }, [currentLesson]);

  return (
    <>
      {lesson?.url ? (
        <div className='w-full sm:w-1/2 flex flex-col'>
          <ReactPlayer
            ref={videoPlayer}
            style={{
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
            }}
            width='100%'
            height='100%'
            url={lesson.url}
            config={{
              youtube: {
                playerVars: { showinfo: 0 },
              },
            }}
            onProgress={({ playedSeconds }: OnProgressProps) => {
              setDuration((prev) => ({ ...prev, playedSeconds }));
            }}
            onDuration={(totalSeconds: number) => {
              setDuration({ playedSeconds: 0, totalSeconds });
            }}
          />
          <progress
            className='w-full h-2 bg-green-500'
            value={duration.playedSeconds}
            max={duration.totalSeconds}
          ></progress>
        </div>
      ) : (
        <img
          src={Cover}
          className='w-full sm:w-1/2 object-cover bg-orange-200 rounded-l-md px-4'
        />
      )}
      <div className='w-full sm:w-1/2 h-full flex flex-col py-2'>
        <p className='w-full h-fit flex items-center justify-center font-semibold text-xl gap-2 px-2'>
          {lesson.title}
        </p>
        <div className='w-full h-full overflow-y-auto bg-transparent scrollbar-thin scrollbar-thumb-gray-500 p-4'>
          {parser(lesson.content)}
        </div>
      </div>
    </>
  );
};

const Carousel = ({ lessons, course_id }: CarouselProps) => {
  const dispatch = useAppDispatch();
  const { courseDetail: enrolledCourse } = useAppSelector(
    (state) => state.course,
  );
  const [lessonInfo, setLessonInfo] = useState({
    currentLesson: FIRST_LESSON_INDEX,
    lastCompletedLesson: FIRST_LESSON_INDEX,
    isLastLesson: false,
  });
  const [
    createLessonCompletion,
    { isLoading: isCompletingLesson, isSuccess },
  ] = useCreateLessonCompetedMutation();
  const [
    updateCourseCompletion,
    {
      isLoading: isCompletingCourse,
      isSuccess: isCourseCompletedSuccessfully,
    },
  ] = useUpdateCourseEnrollmentMutation();

  useEffect(() => {
    isCourseCompletedSuccessfully &&
      dispatch(
        updateCourse({
          course: DEFAULT_COURSE,
          showEnrolledCourseModal: false,
        }),
      );
  }, [isCourseCompletedSuccessfully]);

  useEffect(() => {
    setLessonInfo((prev) => ({
      ...prev,
      isLastLesson: lessonInfo.currentLesson === lessons.length,
    }));
  }, [lessonInfo.currentLesson]);

  useEffect(() => {
    const currentLessonIndex = lessons?.findIndex((lesson) =>
      enrolledCourse?.lessonCompletions?.every(
        (completion) => completion.lesson_id !== lesson.id,
      ),
    );
    const lessonIndex =
      enrolledCourse?.lessonCompletions?.length &&
      currentLessonIndex !== ITEM_NOT_FOUND
        ? currentLessonIndex
        : FIRST_LESSON_INDEX;

    setLessonInfo((prev) => ({
      ...prev,
      currentLesson: lessonIndex,
      lastCompletedLesson: lessonIndex,
    }));
  }, []);

  useEffect(() => {
    isSuccess &&
      setLessonInfo((prev) => {
        const lessonIndex = increment(prev.currentLesson);
        return {
          ...prev,
          currentLesson: lessonIndex,
          lastCompletedLesson: lessonIndex,
        };
      });
  }, [isSuccess]);

  const handleCourseCompletion = useCallback(() => {
    updateCourseCompletion({
      course_id,
      finished: true,
    });
  }, []);

  return (
    <div className='w-full flex overflow-hidden relative rounded-md'>
      {lessonInfo.isLastLesson ? (
        <FinishCourseItem
          handleCourseCompletion={handleCourseCompletion}
        />
      ) : (
        <>
          {lessons?.map((lesson) => (
            <div
              key={lesson.id}
              style={{
                transform: `translateX(-${
                  lessonInfo.currentLesson * 100
                }%)`,
              }}
              className='min-w-full w-full h-[70vh] sm:h-[50vh] flex flex-col sm:flex-row bg-gray-100 rounded-r-lg transition ease-out duration-300'
            >
              <CourseLesson
                lesson={lesson}
                currentLesson={lessonInfo.currentLesson}
              />
            </div>
          ))}
          <div className='flex items-center gap-2 absolute bottom-0 right-3 text-4xl'>
            <button
              disabled={lessonInfo.currentLesson === FIRST_LESSON_INDEX}
              onClick={() =>
                setLessonInfo((prev) => ({
                  ...prev,
                  currentLesson: decrement(prev.currentLesson),
                }))
              }
              className='cursor-pointer rounded-full hover:bg-gray-300 transition-colors ease-in-out duration-200 disabled:text-gray-400 disabled:hover:bg-none'
            >
              <MdArrowLeft />
            </button>
            <button
              disabled={lessonInfo.isLastLesson}
              onClick={() => {
                lessonInfo.currentLesson >= lessonInfo.lastCompletedLesson
                  ? createLessonCompletion({
                      course_id,
                      lesson_id:
                        lessons[lessonInfo.currentLesson].id ?? '',
                    })
                  : setLessonInfo((prev) => ({
                      ...prev,
                      currentLesson: increment(prev.currentLesson),
                    }));
              }}
              className='cursor-pointer rounded-full hover:bg-gray-300 transition-colors ease-in-out duration-200 disabled:text-gray-400 disabled:hover:bg-none'
            >
              <MdArrowRight />
            </button>
            <p className='text-xs md:text-base font-semibold text-gray-500'>{`${increment(lessonInfo.currentLesson)} / ${lessons.length}`}</p>
          </div>
        </>
      )}
      {(isCompletingLesson || isCompletingCourse) && (
        <div className='absolute w-full h-full bg-black/70 flex flex-col items-center justify-center'>
          <div className='w-7 h-7 rounded-full border-t-2 border-t-white animate-spin outline outline-1 outline-offset-2 outline-orange-500'></div>
        </div>
      )}
    </div>
  );
};

const ViewCourseModal = () => {
  const { courseDetail: enrolledCourse } = useAppSelector(
    (state) => state.course,
  );
  return (
    <ModalOverlay>
      <ModalContentWrapper
        modal={MODAL_TYPE.ENROLLED_COURSE}
        widthStyles='w-[95%] xs:w-4/5 sm:w-3/4 p-10'
      >
        <Carousel
          lessons={enrolledCourse.lessons ?? []}
          course_id={enrolledCourse.id}
        />
      </ModalContentWrapper>
    </ModalOverlay>
  );
};

export default ViewCourseModal;
