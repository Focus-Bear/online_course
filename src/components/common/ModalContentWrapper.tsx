import { DEFAULT_COURSE } from 'assets/data';
import { MODAL_TYPE } from 'constants/general';
import { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';
import { useAppDispatch } from 'store';
import { updateCourse } from 'store/reducer/course';

interface ModalContentWrapperProps {
  readonly children: ReactNode;
  bgTextStyles?: string;
  modal: string;
  title?: string;
  widthStyles?: string;
}

const ModalContentWrapper = ({
  children,
  bgTextStyles = 'bg-white text-black',
  widthStyles = 'w-[95%] xs:w-4/5 sm:w-3/4 md:w-3/5 lg:w-1/2 2xl:w-2/5',
  modal,
  title,
}: ModalContentWrapperProps) => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    let closeModalAttributes = {};
    switch (modal) {
      case MODAL_TYPE.ENROLLED_COURSE:
        closeModalAttributes = { showEnrolledCourseModal: false };
        break;
      case MODAL_TYPE.COURSE_DETAILS:
        closeModalAttributes = { showCourseDetail: false };
        break;
      default:
        closeModalAttributes = { isNewCourseModalOpened: false };
    }
    dispatch(
      updateCourse({ course: DEFAULT_COURSE, ...closeModalAttributes })
    );
  };

  return (
    <div
      className={`relative ${widthStyles} h-fit max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 flex flex-col rounded-md p-6 mx-auto top-1/4 -translate-y-1/4 ${bgTextStyles}`}
    >
      <div className='absolute right-1.5 top-1.5 w-fit h-fit z-10'>
        <MdClose
          className='w-fit h-6 bg-gray-800 text-white rounded p-0.5 cursor-pointer'
          onClick={handleCloseModal}
        />
      </div>
      {title ? (
        <div className='w-fit h-fit text-base italic font-bold leading-4'>
          {title}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default ModalContentWrapper;
