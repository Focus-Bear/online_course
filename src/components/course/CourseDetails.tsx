import { useAppDispatch, useAppSelector } from 'store';
import ReactTooltip from 'react-tooltip';
import { MdLibraryAdd, MdSave } from 'react-icons/md';
import Lessons from '../lessons';
import { updateNewLesson } from 'store/reducer/course';
import ModalOverlay from 'components/common/ModalOverlay';
import ModalContentWrapper from 'components/common/ModalContentWrapper';
import { EMPTY_TEXT_EDITOR, MODAL_TYPE } from 'constants/general';
import { isYoutubeURL } from 'utils/support';
import { useUpsertCourseLessonsMutation } from 'store/reducer/api';
import { t } from 'i18next';

const CourseDetailsActions = () => {
  const dispatch = useAppDispatch();
  const { courseDetail } = useAppSelector((state) => state.course);
  const [createOrUpdateLessons, { isLoading }] =
    useUpsertCourseLessonsMutation();
  const lessons = courseDetail?.lessons ?? [];
  const shouldAllowAddOrSaveLessons = lessons.every((lesson) => {
    const isRequiredFieldsValid =
      lesson.title &&
      lesson.content &&
      lesson.content !== EMPTY_TEXT_EDITOR;
    const isUrlValid = lesson.url ? isYoutubeURL(lesson.url) : true;
    return isRequiredFieldsValid && isUrlValid;
  });

  return (
    <div className='absolute top-1.5 right-10 w-fit h-fit flex items-center gap-2'>
      {isLoading ? (
        <div className='w-4 h-4 rounded-full border-t border-gray-800 animate-spin'></div>
      ) : (
        <>
          <MdLibraryAdd
            data-for='new_lesson'
            data-tip={t('lesson.new_lesson')}
            onClick={() => {
              shouldAllowAddOrSaveLessons && dispatch(updateNewLesson());
            }}
            className={`w-fit h-6 text-white rounded p-0.5 cursor-pointer outline-none ${
              shouldAllowAddOrSaveLessons ? 'bg-gray-800' : 'bg-gray-400'
            }`}
          />
          <MdSave
            data-for='save'
            data-tip={t('save')}
            onClick={() => {
              shouldAllowAddOrSaveLessons &&
                createOrUpdateLessons({
                  course_id: courseDetail.id,
                  lessons,
                });
            }}
            className={`w-fit h-6 text-white rounded p-0.5 cursor-pointer outline-none ${
              shouldAllowAddOrSaveLessons ? 'bg-gray-800' : 'bg-gray-400'
            }`}
          />
          <ReactTooltip
            id='save'
            place='left'
            type='dark'
            effect='float'
          />
        </>
      )}
    </div>
  );
};

const CourseDetails = () => {
  const {
    course: { courseDetail: selectedCourse },
    user: { isAdmin },
  } = useAppSelector((state) => state);
  return (
    <ModalOverlay>
      <ModalContentWrapper
        bgTextStyles='bg-gray-200 gap-4'
        modal={MODAL_TYPE.COURSE_DETAILS}
      >
        <CourseDetailsActions />
        <div className='w-full h-fit flex flex-col gap-1 py-2'>
          <h5 className='font-bold italic'>
            {selectedCourse?.name ?? ''}
          </h5>
          <p className='font-medium text-sm leading-4 tracking-wide text-justify line-clamp-3'>
            {selectedCourse?.description ?? ''}
          </p>
          {isAdmin ? (
            <span className='text-xs text-blue-600 font-medium'>
              {selectedCourse.author?.username}
            </span>
          ) : null}
        </div>
        <Lessons />
      </ModalContentWrapper>
    </ModalOverlay>
  );
};

export default CourseDetails;
