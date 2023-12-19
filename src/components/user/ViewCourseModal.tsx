import ModalContentWrapper from 'components/common/ModalContentWrapper';
import ModalOverlay from 'components/common/ModalOverlay';
import { FIRST_LESSON_INDEX, MODAL_TYPE } from 'constants/general';

import { useState } from 'react';
import parser from 'html-react-parser';
import ReactPlayer from 'react-player/lazy';
import { OnProgressProps } from 'react-player/base';
import next from 'assets/images/next.svg';
import previous from 'assets/images/previous.svg';
import { useAppSelector } from 'store';
import { Lesson } from 'constants/interface';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { decrement, increment } from 'utils/support';
import { useCreateLessonCompetedMutation } from 'store/reducer/api';
import Cover from 'assets/images/bear.png';

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
      <div className='w-full sm:w-1/2 h-full flex flex-col'>
        <div className='w-full h-[10%] flex items-center justify-center font-semibold text-xl gap-2 px-2'>
          {lesson.title}
        </div>
        <div className='w-full h-[80%] overflow-y-auto bg-transparent pl-10 pr-4'>
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
  const [currentLesson, setCurrentLesson] = useState(FIRST_LESSON_INDEX);
  const [createLessonCompletion, { isLoading }] =
    useCreateLessonCompetedMutation();

  return (
    <div className='w-full flex overflow-hidden relative'>
      {lessons.map((lesson) => (
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
        {isLoading ? (
          <div className='w-5 h-5 rounded-full border-t-2 border-gray-600 animate-spin mx-auto'></div>
        ) : (
          <>
            <button
              disabled={currentLesson === FIRST_LESSON_INDEX}
              onClick={() => setCurrentLesson((prev) => decrement(prev))}
              className='cursor-pointer rounded-full hover:bg-gray-300 transition-colors ease-in-out duration-200'
            >
              <MdArrowLeft />
            </button>
            <button
              disabled={currentLesson === decrement(lessons.length)}
              onClick={() => {
                // createLessonCompletion({
                //   course_id,
                //   lesson_id: lessons[currentLesson].id,
                // });
                setCurrentLesson((prev) => increment(prev));
              }}
              className='cursor-pointer rounded-full hover:bg-gray-300 transition-colors ease-in-out duration-200'
            >
              <MdArrowRight />
            </button>
          </>
        )}
      </div>
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
