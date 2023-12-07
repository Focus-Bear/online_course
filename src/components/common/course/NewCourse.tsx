import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import close from 'assets/images/close.svg';
import { MdSave } from 'react-icons/md';
import { useCreateCourseMutation } from 'store/reducer/api';
import { useAppDispatch } from 'store';
import { updateIsNewCourseModalOpened } from 'store/reducer/user';
import { DEFAULT_NEW_DESCRIPTION } from 'assets/data';
import { toast } from 'react-toastify';
import ModalOverlay from 'components/common/ModalOverlay';
import ModalContentWrapper from 'components/common/ModalContentWrapper';

const NewCourse = () => {
  const dispatch = useAppDispatch();
  const [
    createCourse,
    { isLoading: isCreatingCourse, isSuccess, isError },
  ] = useCreateCourseMutation();
  const [course, setCourse] = useState(DEFAULT_NEW_DESCRIPTION);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Course created successfully');
      dispatch(updateIsNewCourseModalOpened(false));
    }
    isError && toast.error('Error, unable to create the course.');
  }, [isSuccess, isError]);

  return (
    <ModalOverlay>
      <ModalContentWrapper>
        <div className='absolute right-2 top-1.5 w-fit h-fit'>
          <ReactTooltip
            id='exit'
            place='right'
            type='dark'
            effect='float'
          />
          <img
            data-for='exit'
            data-tip='Exit'
            className='w-5 h-5 cursor-pointer object-cover bg-gray-200 hover:bg-gray-400'
            src={close}
            alt='Close'
            onClick={() => {
              dispatch(updateIsNewCourseModalOpened(false));
            }}
          />
        </div>
        <div className='w-full h-fit text-lg rounded gap-1.5 text-gray-700 font-semibold flex flex-col justify-center'>
          <div className='w-fit h-fit text-base italic font-bold leading-4'>
            Create New Course
          </div>
          <div className='w-full flex flex-col items-center gap-4'>
            <div className='w-full flex flex-col gap-0.5'>
              <div className='text-xs font-bold'>Name</div>
              <input
                disabled={isCreatingCourse}
                className={`w-full outline-none text-sm bg-gray-100 focus:bg-gray-50 rounded px-2 py-1 text-gray-700 ${
                  !course.name ? 'border border-red-400' : ''
                }`}
                type='text'
                value={course.name}
                onChange={({
                  target: { value },
                }: React.ChangeEvent<HTMLInputElement>) =>
                  setCourse((prev) => ({ ...prev, name: value }))
                }
              />
            </div>
            <div className='w-full flex flex-col gap-0.5'>
              <div className='text-xs font-bold'>Description</div>
              <textarea
                disabled={isCreatingCourse}
                rows={6}
                className={`w-full outline-none bg-gray-100 focus:bg-gray-50 text-sm text-gray-700 resize-none rounded px-1.5 py-1 ${
                  !course.description ? 'border border-red-400' : ''
                }`}
                value={course.description}
                onChange={({
                  target: { value },
                }: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCourse((prev) => ({ ...prev, description: value }))
                }
              ></textarea>
            </div>
            <button
              disabled={isCreatingCourse}
              onClick={() => {
                createCourse({
                  name: course.name,
                  description: course.description,
                });
              }}
              className='w-fit h-fit px-4 py-1 self-end text-sm rounded-md tracking-wide bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1.5'
            >
              {isCreatingCourse ? (
                <span className='w-4 h-4 rounded-full border-white border-t animate-spin'></span>
              ) : (
                <>
                  SAVE
                  <MdSave className='text-base' />
                </>
              )}
            </button>
          </div>
        </div>
      </ModalContentWrapper>
    </ModalOverlay>
  );
};

export default NewCourse;
