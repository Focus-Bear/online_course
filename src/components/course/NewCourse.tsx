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
import { DEFAULT_COURSE } from 'assets/default';
import { t } from 'i18next';
import { CoursePlatform, USER_ROLES } from 'constants/enum';
import { useAuth0 } from '@auth0/auth0-react';
import { TOKEN_ROLES_KEY } from 'constants/routes';

const NewCourse = () => {
  const dispatch = useAppDispatch();
  const { newCourse } = useAppSelector((state) => state.course);
  const { id, name, description, isNew, platform } = newCourse;
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
        isSuccessCreated
          ? t('success.course_created_successfully')
          : t('success.course_updated_successfully'),
      );
      dispatch(
        updateCourse({
          course: DEFAULT_COURSE,
          isNewCourseModalOpened: false,
        }),
      );
    }
    (isErrorCreated || isErrorUpdated) &&
      toast.error(
        isErrorCreated
          ? t('error.couldnt_able_to_create_course')
          : t('error.couldnt_able_to_update_course'),
      );
  }, [isSuccessCreated, isErrorCreated, isSuccessUpdated, isErrorUpdated]);

  const isCreatingCourseOrIsUpdatingCourse =
    isCreatingCourse || isUpdatingCourse;

  const { user: auth0User } = useAuth0();

  return (
    <ModalOverlay>
      <ModalContentWrapper
        modal={MODAL_TYPE.NEW_COURSE}
        title={
          isNew ? t('course.create_course') : t('course.update_course')
        }
      >
        <div className='w-full flex flex-col items-center gap-4'>
          <div className='w-full flex flex-col gap-0.5'>
            <div className='text-sm font-bold'>{t('course.title')}</div>
            <input
              disabled={isCreatingCourseOrIsUpdatingCourse}
              className={`w-full outline-none text-sm bg-gray-100 focus:bg-gray-50 rounded px-2 py-1 text-gray-700 ${
                !name && 'border border-red-400'
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
            <div className='text-sm font-bold'>
              {t('course.description')}
            </div>
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
                  updateNewCourse({ ...newCourse, description: value }),
                )
              }
            ></textarea>
          </div>
          {auth0User?.[TOKEN_ROLES_KEY].includes(USER_ROLES.ADMIN) && (
            <div className='w-full flex flex-col gap-0.5'>
              <div className='text-sm font-bold'>
                {t('course.platform')}
              </div>
              <select
                value={platform}
                className='w-full bg-gray-200 p-1 rounded font-medium text-xs sm:text-sm cursor-pointer outline-none'
                onChange={({ target: { value } }) =>
                  dispatch(
                    updateNewCourse({
                      ...newCourse,
                      platform: value as CoursePlatform,
                    }),
                  )
                }
              >
                {Object.values(CoursePlatform).map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
          )}

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
                {isNew ? t('save') : t('update')}
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
