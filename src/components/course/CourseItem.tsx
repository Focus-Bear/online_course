import Eye from 'assets/svg/Eye';
import EyeClosed from 'assets/svg/EyeClosed';
import Pencil from 'assets/svg/Pencil';
import Trash from 'assets/svg/Trash';
import COLOR from 'constants/color';
import {
  NUMBER_OF_EMPTY_ITEMS,
  NUMBER_OF_STARS,
  USER_TAB,
} from 'constants/general';
import { CourseType } from 'constants/interface';
import moment from 'moment';
import { MdComment, MdRestore } from 'react-icons/md';
import StarsRating from 'react-star-ratings';
import ReactTooltip from 'react-tooltip';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useCreateCourseEnrollmentMutation,
  useDeleteCourseMutation,
  useHideCourseMutation,
} from 'store/reducer/api';
import {
  updateCourse,
  updateCourseHighlights,
  updateNewCourse,
  updateReviews,
  updateShowCourseHighlights,
} from 'store/reducer/course';
import Cover from 'assets/images/bear.png';
import { getCourseInfo, getRatingDetails } from 'utils/support';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { t } from 'i18next';

interface CourseItemProps {
  course: CourseType;
}

const RateCourse = ({ course }: CourseItemProps) => {
  const dispatch = useAppDispatch();
  const userReview = (course?.ratings ?? []).find(
    (rating) => rating.user_id === course.author_id,
  );

  const { averageRatings, reviews } = useMemo(
    () => getRatingDetails(course?.ratings ?? []),
    [course],
  );

  return (
    <div className='w-fit h-fit flex items-end gap-2 self-end '>
      <div className='flex items-center gap-2 cursor-default'>
        <StarsRating
          rating={averageRatings}
          starRatedColor={COLOR.ORANGE}
          numberOfStars={NUMBER_OF_STARS}
          starDimension='18px'
          starSpacing='2px'
        />
        <p className='text-xs sm:text-sm font-semibold relative top-0.5'>{`${averageRatings}/(${
          course.ratings?.length ?? NUMBER_OF_EMPTY_ITEMS
        })`}</p>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          dispatch(
            updateReviews({
              userRating: userReview,
              ratings: course.ratings ?? [],
              isReviewsModalOpened: true,
              course_id: course.id,
            }),
          );
        }}
        className='w-fit h-fit hover:bg-gray-800 hover:text-white rounded px-1 duration-300 ease-in-out flex items-end gap-0.5'
      >
        <MdComment />
        <span className='text-sm font-semibold'>
          {new Intl.NumberFormat('en', {
            notation: 'compact',
            maximumSignificantDigits: 3,
          }).format(reviews.length)}
        </span>
      </button>
    </div>
  );
};

const EnrollmentBtn = ({ course }: CourseItemProps) => {
  const dispatch = useAppDispatch();
  const [createCourseEnrollment, { isLoading }] =
    useCreateCourseEnrollmentMutation();
  const {
    setting: { currentTab },
    user: { details },
  } = useAppSelector((state) => state);

  const { isCourseCompleted, isCourseInProgress, isSelfTaught } =
    getCourseInfo(course, details);
  const enrollCourseLabel = isCourseInProgress ? t('continue') : t('view');

  return isCourseCompleted &&
    currentTab === USER_TAB.ENROLLED_COURSES.tabIndex ? (
    <p className='absolute top-1 left-1 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md cursor-default select-none'>
      {isSelfTaught ? t('self_taught') : t('completed')}
    </p>
  ) : (
    <button
      disabled={Boolean(
        (isCourseCompleted &&
          currentTab === USER_TAB.ENROLLED_COURSES.tabIndex) ||
          isLoading,
      )}
      onClick={(event) => {
        event.stopPropagation();
        if (currentTab === USER_TAB.ENROLLED_COURSES.tabIndex) {
          course.lessons?.length
            ? dispatch(
                updateCourse({ course, showEnrolledCourseModal: true }),
              )
            : toast.info(t('course.the_course_has_no_lessons_yet'));
        } else {
          createCourseEnrollment(course.id);
        }
      }}
      className={`w-fit h-fit px-2 py-0.5 absolute top-1 left-1 ${isCourseInProgress ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}  text-white rounded text-xs font-semibold ${
        isLoading ? 'animate-pulse' : 'animate-none'
      } shadow-md uppercase`}
    >
      {isLoading
        ? '......'
        : currentTab === USER_TAB.ENROLLED_COURSES.tabIndex
          ? enrollCourseLabel
          : t('enroll')}
    </button>
  );
};

const CourseItemActions = ({ course }: CourseItemProps) => {
  const dispatch = useAppDispatch();
  const [deleteCourse, { isLoading: isDeletingCourse }] =
    useDeleteCourseMutation();
  const [hideCourse, { isLoading: isHidingCourse }] =
    useHideCourseMutation();
  const { isAdmin } = useAppSelector((state) => state.user);

  return (
    <div className='w-fit flex items-center gap-4 text-xs sm:text-sm text-white font-semibold pb-1'>
      {isDeletingCourse || isHidingCourse ? (
        <div className='w-5 h-5 border-t border-gray-800 animate-spin rounded-full'></div>
      ) : (
        <>
          <button
            onClick={(event) => {
              event.stopPropagation();
              dispatch(
                updateNewCourse({
                  id: course.id,
                  name: course.name,
                  description: course.description,
                  isNew: false,
                }),
              );
            }}
            data-for='edit'
            data-tip={t('edit')}
          >
            <Pencil />
          </button>
          {isAdmin ? (
            <>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  hideCourse({
                    course_id: course.id,
                    should_hide: !course.is_hidden,
                  });
                }}
                data-tip
                data-for={course.is_hidden ? 'hide' : 'show'}
              >
                {course.is_hidden ? <EyeClosed /> : <Eye />}
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  deleteCourse({
                    course_id: course.id,
                    deleted: !course.deleted,
                  });
                }}
                data-tip
                data-for='delete'
              >
                {course.deleted ? (
                  <MdRestore color={COLOR.BLACK} />
                ) : (
                  <Trash />
                )}
              </button>
            </>
          ) : null}
        </>
      )}
      <ReactTooltip id='edit' place='left' type='dark' effect='float'>
        {t('edit')}
      </ReactTooltip>
      <ReactTooltip id='delete' place='top' type='dark' effect='float'>
        {course.deleted ? t('restore') : t('delete')}
      </ReactTooltip>
      <ReactTooltip id='hide' place='right' type='dark' effect='float'>
        {t('hidden')}
      </ReactTooltip>
      <ReactTooltip id='show' place='right' type='dark' effect='float'>
        {t('show')}
      </ReactTooltip>
    </div>
  );
};

const CourseItemDetails = ({ course }: CourseItemProps) => {
  const { currentTab } = useAppSelector((state) => state.setting);
  const shouldBeMyCoursesTab = [
    USER_TAB.MY_COURSES.tabIndex,
    USER_TAB.WHAT_TO_LEARN_NEXT.tabIndex,
  ].includes(currentTab);
  return (
    <div
      className={`w-full h-fit flex flex-col sm:flex-row shadow-md ${
        shouldBeMyCoursesTab ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <img
        src={Cover}
        alt='Focus Bear'
        className='w-full sm:w-[35%] h-32 sm:max-h-full bg-orange-200 rounded-l-md object-contain p-4'
      />
      <div className='w-full sm:w-[65%] h-full bg-gray-100 flex flex-col text-sm font-semibold gap-1 p-2 rounded-r-md'>
        <h6 className='w-full h-fit text-blue-900 text-base font-bold select-none leading-5 pb-1 line-clamp-2'>
          {course.name}
        </h6>
        <p className='line-clamp-2 leading-4 text-xs text-ellipsis select-none'>
          {course.description}
        </p>
        <p className='w-fit text-blue-600 text-xs mt-auto ml-auto'>
          {moment(course.createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

const CourseItem = ({ course }: CourseItemProps) => {
  const dispatch = useAppDispatch();
  const {
    user: { details: userInfo, isAdmin },
    setting: { currentTab },
  } = useAppSelector((state) => state);
  const shouldBeMyCoursesTab = currentTab === USER_TAB.MY_COURSES.tabIndex;
  const shouldBeWhatToLearnNextTab =
    currentTab === USER_TAB.WHAT_TO_LEARN_NEXT.tabIndex;
  const shouldAllowCourseItemActions =
    isAdmin || (shouldBeMyCoursesTab && userInfo?.id === course.author_id);
  const shouldShowCourseDetails = isAdmin || shouldBeMyCoursesTab;

  return (
    <div
      role='button'
      onClick={() => {
        shouldShowCourseDetails &&
          dispatch(updateCourse({ course, showCourseDetail: true }));
        if (shouldBeWhatToLearnNextTab) {
          dispatch(updateCourseHighlights(course));
          dispatch(updateShowCourseHighlights(true));
        }
      }}
      className='flex flex-col gap-1 relative'
    >
      {shouldAllowCourseItemActions ? (
        <CourseItemActions course={course} />
      ) : (
        <EnrollmentBtn course={course} />
      )}
      <CourseItemDetails course={course} />
      <RateCourse course={course} />
    </div>
  );
};

export default CourseItem;
