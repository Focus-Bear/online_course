import Eye from 'assets/svg/Eye';
import EyeClosed from 'assets/svg/EyeClosed';
import Pencil from 'assets/svg/Pencil';
import Trash from 'assets/svg/Trash';
import COLOR from 'constants/color';
import { NUMBER_OF_STARS, USER_TAB } from 'constants/general';
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
  updateNewCourse,
  updateReviews,
} from 'store/reducer/course';
import Cover from 'assets/images/bear.png';
import { getRatingDetails } from 'utils/support';
import { useMemo } from 'react';

interface CourseItemProps {
  course: CourseType;
}

const RateCourse = ({ course }: CourseItemProps) => {
  const dispatch = useAppDispatch();
  const userReview = (course?.ratings ?? []).find(
    (rating) => rating.user_id === course.author_id
  );

  const { averageRatings, reviews } = useMemo(
    () => getRatingDetails(course?.ratings ?? []),
    [course]
  );

  return (
    <div className='w-fit h-fit flex items-end gap-2 self-end'>
      <div className='flex items-end gap-2 cursor-default'>
        <StarsRating
          rating={averageRatings}
          starRatedColor={COLOR.ORANGE}
          numberOfStars={NUMBER_OF_STARS}
          starDimension='18px'
          starSpacing='2px'
        />
        <p className='text-xs sm:text-sm font-semibold'>{`${averageRatings}/(${
          course.ratings?.length ?? 0
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
            })
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
  const isCourseCompleted = course?.enrollments?.findIndex(
    ({ user_id, course_id, finished }) =>
      finished && course.id === course_id && user_id !== details?.id
  );

  return isCourseCompleted ? (
    <p className='absolute top-1 left-1 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md cursor-default select-none'>
      Completed
    </p>
  ) : (
    <button
      disabled={Boolean(isCourseCompleted || isLoading)}
      onClick={(event) => {
        event.stopPropagation();
        currentTab === USER_TAB.ENROLLED_COURSES.tabIndex
          ? dispatch(
              updateCourse({ course, showEnrolledCourseModal: true })
            )
          : createCourseEnrollment(course.id);
      }}
      className={`w-fit h-fit px-2 py-0.5 absolute top-1 left-1 bg-blue-500 hover:bg-blue-600  text-white rounded text-xs font-semibold ${
        isLoading ? 'animate-pulse' : 'animate-none'
      } shadow-md uppercase`}
    >
      {isLoading
        ? '......'
        : currentTab === USER_TAB.ENROLLED_COURSES.tabIndex
        ? 'View'
        : 'Enroll'}
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
                })
              );
            }}
            data-for='edit'
            data-tip='Edit'
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
        Edit
      </ReactTooltip>
      <ReactTooltip id='delete' place='top' type='dark' effect='float'>
        {course.deleted ? 'Restore' : 'Delete'}
      </ReactTooltip>
      <ReactTooltip id='hide' place='right' type='dark' effect='float'>
        Hidden
      </ReactTooltip>
      <ReactTooltip id='show' place='right' type='dark' effect='float'>
        Show
      </ReactTooltip>
    </div>
  );
};

const CourseItemDetails = ({ course }: CourseItemProps) => {
  const { currentTab } = useAppSelector((state) => state.setting);
  const shouldBeMyCoursesTab = currentTab === USER_TAB.MY_COURSES.tabIndex;
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
      <div className='w-full sm:w-[65%] h-full bg-gray-100 flex flex-col justify-between text-sm font-semibold gap-1 p-2 rounded-r-md'>
        <div className='w-full text-blue-900 text-base font-bold truncate select-none'>
          {course.name}
        </div>
        <div className='line-clamp-3 leading-4 text-xs text-justify select-none'>
          {course.description}
        </div>
        <p className='w-fit text-blue-600 text-xs self-end'>
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
  const shouldAllowCourseItemActions =
    isAdmin || (shouldBeMyCoursesTab && userInfo?.id === course.author_id);
  const shouldShowCourseDetails = isAdmin || shouldBeMyCoursesTab;

  return (
    <div
      onClick={() => {
        shouldShowCourseDetails &&
          dispatch(updateCourse({ course, showCourseDetail: true }));
      }}
      className='flex flex-col gap-1 relative cursor-pointer'
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
