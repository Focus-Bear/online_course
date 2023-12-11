import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { MdClose, MdSave } from 'react-icons/md';
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from 'store/reducer/api';
import { useAppDispatch, useAppSelector } from 'store';
import { updateIsNewCourseModalOpened } from 'store/reducer/user';
import { toast } from 'react-toastify';
import ModalOverlay from 'components/common/ModalOverlay';
import ModalContentWrapper from 'components/common/ModalContentWrapper';
import { updateNewCourse } from 'store/reducer/course';

const NewCourse = () => {
  const dispatch = useAppDispatch();
  const { newCourse } = useAppSelector((state) => state.course);
  const { id, name, description, isNew } = newCourse;
  const [
    createCourse,
    {
      isLoading: isCreatingCourse,
      isSuccess: isSuccessCreated,
      isError: isErrorCreated,
    },
  ] = useCreateCourseMutation();
  const [
    updateCourse,
    {
      isLoading: isUpdatingCourse,
      isSuccess: isSuccessUpdated,
      isError: isErrorUpdated,
    },
  ] = useUpdateCourseMutation();

  useEffect(() => {
    if (isSuccessCreated || isSuccessUpdated) {
      toast.success(
        `Course ${isSuccessCreated ? 'created' : 'updated'} successfully`
      );
      dispatch(updateIsNewCourseModalOpened(false));
    }
    (isErrorCreated || isErrorUpdated) &&
      toast.error(
        `Error, unable to ${
          isErrorCreated ? 'create' : 'update'
        } the course.`
      );
  }, [isSuccessCreated, isErrorCreated, isSuccessUpdated, isErrorUpdated]);

  const isCreatingCourseOrIsUpdatingCourse =
    isCreatingCourse || isUpdatingCourse;

  return (
    <ModalOverlay>
      <ModalContentWrapper>
        <div className='absolute right-2 top-1.5 w-fit h-fit'>
          <MdClose
            className='w-fit h-6 bg-gray-800 text-white rounded p-0.5 cursor-pointer'
            onClick={() => {
              dispatch(updateIsNewCourseModalOpened(false));
            }}
          />
        </div>
        <div className='w-fit h-fit text-base italic font-bold leading-4'>
          {isNew ? 'Create New Course' : 'Update Course'}
        </div>
        <div className='w-full flex flex-col items-center gap-4'>
          <div className='w-full flex flex-col gap-0.5'>
            <div className='text-xs font-bold'>Name</div>
            <input
              disabled={isCreatingCourseOrIsUpdatingCourse}
              className={`w-full outline-none text-sm bg-gray-100 focus:bg-gray-50 rounded px-2 py-1 text-gray-700 ${
                !name ? 'border border-red-400' : ''
              }`}
              type='text'
              value={name}
              onChange={({
                target: { value },
              }: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(updateNewCourse({ ...newCourse, name: value }))
              }
            />
          </div>
          <div className='w-full flex flex-col gap-0.5'>
            <div className='text-xs font-bold'>Description</div>
            <textarea
              disabled={isCreatingCourseOrIsUpdatingCourse}
              rows={6}
              className={`w-full outline-none bg-gray-100 focus:bg-gray-50 text-sm text-gray-700 resize-none rounded px-1.5 py-1 ${
                !description ? 'border border-red-400' : ''
              }`}
              value={description}
              onChange={({
                target: { value },
              }: React.ChangeEvent<HTMLTextAreaElement>) =>
                dispatch(
                  updateNewCourse({ ...newCourse, description: value })
                )
              }
            ></textarea>
          </div>
          <button
            disabled={isCreatingCourseOrIsUpdatingCourse}
            onClick={() => {
              isNew
                ? createCourse({
                    name,
                    description,
                  })
                : updateCourse({
                    course_id: id,
                    data: { name, description },
                  });
            }}
            className='w-fit h-fit px-4 py-1 self-end text-sm rounded-md tracking-wide bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1.5'
          >
            {isCreatingCourseOrIsUpdatingCourse ? (
              <span className='w-4 h-4 rounded-full border-white border-t animate-spin'></span>
            ) : (
              <>
                {isNew ? 'Save' : 'Update'}
                <MdSave className='text-base' />
              </>
            )}
          </button>
        </div>
      </ModalContentWrapper>
    </ModalOverlay>
  );
};

export default NewCourse;
