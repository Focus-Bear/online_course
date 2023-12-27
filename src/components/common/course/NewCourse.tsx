import { useEffect } from 'react';
import { MdSave } from 'react-icons/md';
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from 'store/reducer/api';
import { useAppDispatch, useAppSelector } from 'store';
import { toast } from 'react-toastify';
import ModalOverlay from 'components/common/ModalOverlay';
import ModalContentWrapper from 'components/common/ModalContentWrapper';
import { updateCourse, updateNewCourse } from 'store/reducer/course';
import { MODAL_TYPE } from 'constants/general';
import { DEFAULT_COURSE } from 'assets/data';

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
    updateExistingCourse,
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
      dispatch(
        updateCourse({
          course: DEFAULT_COURSE,
          isNewCourseModalOpened: false,
        })
      );
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
      <ModalContentWrapper
        modal={MODAL_TYPE.NEW_COURSE}
        title={isNew ? 'Create New Course' : 'Update Course'}
      >
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
                : updateExistingCourse({
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
