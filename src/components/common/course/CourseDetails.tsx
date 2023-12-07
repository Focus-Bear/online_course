import { useAppDispatch, useAppSelector } from 'store';
import ReactTooltip from 'react-tooltip';
import { MdSave } from 'react-icons/md';
import Lesson from '../../Lesson';
import { updateShowCourseDetail } from 'store/reducer/course';
import ModalOverlay from 'components/common/ModalOverlay';
import ModalContentWrapper from 'components/common/ModalContentWrapper';

const CourseDetails = () => {
  const dispatch = useAppDispatch();
  const { course } = useAppSelector((state) => state.course);
  return (
    <ModalOverlay>
      <ModalContentWrapper styles='bg-sky-700 text-white gap-4'>
        <div className='absolute -top-7 right-0 w-fit h-fit flex items-center gap-2'>
          <button
            onClick={() => {
              //  dispatch(localAddLesson(id));
            }}
            className='w-fit h-fit text-xs tracking-wider font-semibold text-white bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded self-center'
          >
            New Lesson
          </button>
          <div className='w-fit h-fit'>
            <ReactTooltip
              id='save'
              place='top'
              type='dark'
              effect='float'
            />
            <MdSave
              data-for='save'
              data-tip='Save Lesson'
              data-iscapture='true'
              //    onClick={handleSave}
              className='w-fit h-fit text-white bg-black hover:text-gray-300 cursor-pointer p-0.5 text-[18px] rounded'
            />
          </div>
          <div className='w-fit h-fit'>
            <ReactTooltip
              id='exit'
              place='right'
              type='dark'
              effect='float'
            />
            <button
              onClick={() => {
                dispatch(updateShowCourseDetail(false));
              }}
              data-for='exit'
              data-tip='Exit'
              className='w-fit h-fit text-sm bg-black rounded px-1.5 text-white z-50'
            >
              X
            </button>
          </div>
        </div>
        <div className='w-full h-fit flex flex-col gap-1'>
          <div className='font-bold italic'>{course?.name ?? ''}</div>
          <div className='font-medium text-sm leading-4 tracking-wide text-justify line-clamp-3'>
            {course?.description ?? ''}
          </div>
        </div>
        <Lesson lessons={course?.lessons ?? []} />
      </ModalContentWrapper>
    </ModalOverlay>
  );
};

export default CourseDetails;
