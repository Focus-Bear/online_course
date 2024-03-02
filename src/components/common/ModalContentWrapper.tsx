import { DEFAULT_CONFIRM_MODAL, DEFAULT_COURSE } from 'assets/default';
import { MODAL_TYPE } from 'constants/general';
import { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';
import { useAppDispatch } from 'store';
import { updateCourse, updateReviews } from 'store/reducer/course';
import { updateConfirmModal } from 'store/reducer/setting';

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
      case MODAL_TYPE.REVIEWS:
        dispatch(updateReviews({ isReviewsModalOpened: false }));
        break;
      case MODAL_TYPE.CONFIRM:
        dispatch(updateConfirmModal(DEFAULT_CONFIRM_MODAL));
        break;
      default:
        closeModalAttributes = { isNewCourseModalOpened: false };
    }
    dispatch(
      updateCourse({ course: DEFAULT_COURSE, ...closeModalAttributes }),
    );
  };

  return (
    <div
      className={`relative ${widthStyles} h-fit max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 flex flex-col gap-3 rounded-md p-6 mx-auto top-1/4 -translate-y-1/4 ${bgTextStyles}`}
    >
      <div className='absolute right-1.5 top-1.5 w-fit h-fit z-10'>
        <MdClose
          className='w-fit h-5 md:h-6 bg-gray-800 text-white rounded p-0.5 cursor-pointer'
          onClick={handleCloseModal}
        />
      </div>
      {title ? (
        <p className='w-fit max-w-[80%] h-fit italic font-bold truncate text-base md:text-lg leading-6'>
          {title}
        </p>
      ) : null}
      {children}
    </div>
  );
};

export default ModalContentWrapper;
