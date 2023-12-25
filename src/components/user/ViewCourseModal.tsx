import ModalContentWrapper from 'components/common/ModalContentWrapper';
import ModalOverlay from 'components/common/ModalOverlay';
import {
  FIRST_LESSON_INDEX,
  FIRST_LESSON_OFFSET,
  MODAL_TYPE,
} from 'constants/general';

import { useCallback, useEffect, useState } from 'react';
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
import { DEFAULT_COURSE } from 'assets/data';
import { updateCourse } from 'store/reducer/course';

const FinishCourseItem = ({
  handleCourseCompletion,
}: {
  handleCourseCompletion: () => void;
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    handleCourseCompletion();
  }, []);

  return (
    <div className='min-w-full w-full h-[70vh] sm:h-[50vh] flex flex-col gap-3 items-center justify-center font-semibold'>
      <p className='text-xl'>You've completed the course</p>
      <button
        onClick={() => {
          dispatch(
            updateCourse({
              course: DEFAULT_COURSE,
              showEnrolledCourseModal: false,
            })
          );
        }}
        className='w-fit h-fit px-2 py-1 bg-gray-600 hover:bg-gray-700 text-sm text-white rounded-md'
      >
        Back To Enrolled Courses
      </button>
    </div>
  );
};

const ViewCourseItem = ({ lesson }: { lesson: Lesson }) => {
  const [duration, setDuration] = useState({ current: 0, total: 0 });

  return (
    <>
      {lesson?.url ? (
        <ReactPlayer
          style={{
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          }}
          width='50%'
          height='100%'
          url={lesson.url}
          config={{
            youtube: {
              playerVars: { showinfo: 0 },
            },
          }}
          onProgress={(e: OnProgressProps) => {
            let current = { ...duration };
            current.current = e.playedSeconds;
            setDuration(current);
          }}
          onDuration={(d: number) => {
            setDuration({ current: 0, total: d });
          }}
          onEnded={() => {
            //  currentStep !== totalSteps && nextStep();
          }}
        />
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

const Carousel = ({
  lessons,
  course_id,
}: {
  lessons: Lesson[];
  course_id: string;
}) => {
  const { course: enrolledCourse } = useAppSelector(
    (state) => state.course
  );
  const [currentLesson, setCurrentLesson] = useState(
    increment(
      enrolledCourse?.lessonCompletions?.length
        ? lessons?.findIndex((lesson) =>
            enrolledCourse?.lessonCompletions?.every(
              (completion) => completion.lesson_id !== lesson.id
            )
          )
        : FIRST_LESSON_OFFSET
    )
  );
  const [isLastLesson, setIsLastLesson] = useState(false);
  const [
    createLessonCompletion,
    { isLoading: isCompletingLesson, isSuccess },
  ] = useCreateLessonCompetedMutation();
  const [updateCourseCompletion, { isLoading: isCompletingCourse }] =
    useUpdateCourseEnrollmentMutation();

  useEffect(() => {
    console.log(currentLesson === lessons.length);
    setIsLastLesson(currentLesson === lessons.length);
  }, [currentLesson]);

  useEffect(() => {
    isSuccess && setCurrentLesson((prev) => increment(prev));
  }, [isSuccess]);

  const handleCourseCompletion = useCallback(() => {
    updateCourseCompletion({
      course_id,
      finished: true,
    });
  }, []);

  return (
    <div className='w-full flex overflow-hidden relative rounded-md'>
      {isLastLesson ? (
        <FinishCourseItem
          handleCourseCompletion={handleCourseCompletion}
        />
      ) : (
        <>
          {lessons?.map((lesson) => (
            <div
              key={lesson.id}
              style={{
                transform: `translateX(-${currentLesson * 100}%)`,
              }}
              className='min-w-full w-full h-[70vh] sm:h-[50vh] flex flex-col sm:flex-row bg-gray-100 rounded-r-lg transition ease-out duration-300'
            >
              <ViewCourseItem lesson={lesson} />
            </div>
          ))}
          <div className='flex items-center gap-2 absolute bottom-2 right-1 text-4xl'>
            <button
              disabled={currentLesson === FIRST_LESSON_INDEX}
              onClick={() => setCurrentLesson((prev) => decrement(prev))}
              className='cursor-pointer rounded-full hover:bg-gray-300 transition-colors ease-in-out duration-200 disabled:text-gray-400 disabled:hover:bg-none'
            >
              <MdArrowLeft />
            </button>
            <button
              disabled={isLastLesson}
              onClick={() => {
                createLessonCompletion({
                  course_id,
                  lesson_id: lessons[currentLesson].id,
                });
              }}
              className='cursor-pointer rounded-full hover:bg-gray-300 transition-colors ease-in-out duration-200 disabled:text-gray-400 disabled:hover:bg-none'
            >
              <MdArrowRight />
            </button>
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
  const { course: enrolledCourse } = useAppSelector(
    (state) => state.course
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
