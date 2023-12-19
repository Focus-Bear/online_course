import Eye from 'assets/svg/Eye';
import EyeClosed from 'assets/svg/EyeClosed';
import Pencil from 'assets/svg/Pencil';
import Trash from 'assets/svg/Trash';
import COLOR from 'constants/color';
import {
  COURSE_FIRST_LESSON_INDEX,
  NUMBER_OF_STARS,
  USER_TAB,
} from 'constants/general';
import { CourseType } from 'constants/interface';
import moment from 'moment';
import { MdRestore } from 'react-icons/md';
import StarsRating from 'react-star-ratings';
import ReactTooltip from 'react-tooltip';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useCreateCourseEnrollmentMutation,
  useCreateCourseRatingMutation,
  useDeleteCourseMutation,
  useHideCourseMutation,
} from 'store/reducer/api';
import { updateCourse, updateNewCourse } from 'store/reducer/course';
import Cover from 'assets/images/bear.png';
import { toast } from 'react-toastify';
import { getAverageRating } from 'utils/support';
import { useMemo } from 'react';

interface CourseItemProps {
  course: CourseType;
}

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
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  hideCourse({
                    course_id: course.id,
                    hidden: !course.is_hidden,
                  });
                }}
                data-tip
                data-for='hide'
              >
                {course.is_hidden ? <EyeClosed /> : <Eye />}
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
        {course.is_hidden ? 'Show' : 'Hide'}
      </ReactTooltip>
    </div>
  );
};

const RateCourse = ({ course }: CourseItemProps) => {
  const [createRating, { isLoading }] = useCreateCourseRatingMutation();
  const didUserRateThisCourse = (course?.ratings ?? []).some(
    (rating) => rating.user_id === course.author_id
  );
  const rate = useMemo(
    () => getAverageRating(course?.ratings ?? []),
    [course]
  );

  return (
    <div className='flex self-end'>
      {isLoading ? (
        <div className='w-4 h-4 border-t border-gray-800 animate-spin rounded-full '></div>
      ) : (
        <button
          disabled={didUserRateThisCourse}
          onClick={(event) => {
            event.stopPropagation();
          }}
          className='flex items-end gap-2'
        >
          <StarsRating
            rating={rate}
            starRatedColor={COLOR.ORANGE}
            numberOfStars={NUMBER_OF_STARS}
            starDimension='18px'
            starSpacing='2px'
            changeRating={(rating) => {
              !didUserRateThisCourse &&
                createRating({ course_id: course.id, rating });
            }}
          />
          <p className='text-xs sm:text-sm font-semibold'>{`${rate}/(${
            course.ratings?.length ?? 0
          })`}</p>
        </button>
      )}
    </div>
  );
};

const EnrollmentBtn = ({ course }: CourseItemProps) => {
  const dispatch = useAppDispatch();
  const [createCourseEnrollment, { isLoading }] =
    useCreateCourseEnrollmentMutation();
  const { currentTab } = useAppSelector((state) => state.setting);

  return (
    <button
      disabled={isLoading}
      onClick={(event) => {
        event.stopPropagation();
        if (currentTab === USER_TAB.ENROLLED_COURSES.tabIndex) {
          dispatch(
            updateCourse({ course, showEnrolledCourseModal: true })
          );
        } else {
          course.lessons?.length
            ? createCourseEnrollment({
                course_id: course.id,
                lesson_id: course.lessons[COURSE_FIRST_LESSON_INDEX].id,
              })
            : toast.error('This course has no lessons yet');
        }
      }}
      className={`w-fit h-fit px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs sm:text-sm font-semibold absolute top-1 left-1 ${
        isLoading ? 'animate-pulse' : 'animate-none'
      }`}
    >
      {isLoading
        ? '......'
        : currentTab === USER_TAB.ENROLLED_COURSES.tabIndex
        ? 'View'
        : 'Enroll'}
    </button>
  );
};

const CourseItem = ({ course }: CourseItemProps) => {
  const dispatch = useAppDispatch();
  const {
    user: { details: userInfo },
    setting: { currentTab },
  } = useAppSelector((state) => state);
  const shouldBeMyCoursesTab = currentTab === USER_TAB.MY_COURSES.tabIndex;

  return (
    <div
      onClick={() =>
        shouldBeMyCoursesTab &&
        dispatch(updateCourse({ course, showCourseDetail: true }))
      }
      className='flex flex-col gap-1 relative cursor-pointer'
    >
      {shouldBeMyCoursesTab ? (
        <>
          {userInfo?.id === course.author_id ? (
            <CourseItemActions course={course} />
          ) : (
            <div className='w-full min-h-[20px]'></div>
          )}
        </>
      ) : null}
      <div className='w-full h-fit flex flex-col sm:flex-row shadow-md'>
        <img
          src={Cover}
          alt='Focus Bear'
          className='w-full sm:w-[35%] h-32 sm:max-h-full bg-orange-200 rounded-l-md object-contain p-4'
        />
        <div className='w-full sm:w-[65%] h-full bg-gray-100 flex flex-col justify-between text-sm font-semibold gap-1 p-2 rounded-r-md'>
          <div className='w-full text-blue-900 text-base font-bold truncate'>
            {course.name}
          </div>
          <div className='line-clamp-3 leading-4 text-xs text-justify'>
            {course.description}
          </div>
          <p className='w-fit text-blue-600 text-xs self-end'>
            {moment(course.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <RateCourse course={course} />
      {!shouldBeMyCoursesTab ? <EnrollmentBtn course={course} /> : null}
    </div>
  );
};

export default CourseItem;
