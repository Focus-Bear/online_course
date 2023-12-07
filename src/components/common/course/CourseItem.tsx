import Eye from 'assets/svg/Eye';
import Pencil from 'assets/svg/Pencil';
import Trash from 'assets/svg/Trash';
import COLOR from 'constants/color';
import { NUMBER_OF_STARS } from 'constants/general';
import { CourseType } from 'constants/interface';
import moment from 'moment';
import StarsRating from 'react-star-ratings';
import ReactTooltip from 'react-tooltip';
import { useAppDispatch, useAppSelector } from 'store';
import { updateCourse } from 'store/reducer/course';

interface CourseItemProps {
  course: CourseType;
}

const CourseItemActions = () => {
  return (
    <div className='w-fit flex items-center gap-4 text-xs sm:text-sm text-white font-semibold pb-1'>
      <button data-for='edit' data-tip='Edit'>
        <Pencil />
      </button>
      <button data-tip data-for='delete'>
        <Trash />
      </button>
      <button data-tip data-for='hide'>
        <Eye />
      </button>
      <ReactTooltip id='edit' place='left' type='dark' effect='float'>
        Edit
      </ReactTooltip>
      <ReactTooltip id='delete' place='top' type='dark' effect='float'>
        Delete
      </ReactTooltip>
      <ReactTooltip id='hide' place='right' type='dark' effect='float'>
        Hide
      </ReactTooltip>
    </div>
  );
};

const CourseItem = ({ course }: CourseItemProps) => {
  const dispatch = useAppDispatch();
  const { details: userInfo } = useAppSelector((state) => state.user);

  return (
    <button
      onClick={() =>
        dispatch(updateCourse({ course, showCourseDetail: true }))
      }
      className='flex flex-col'
    >
      {userInfo?.id !== course.author_id ? <CourseItemActions /> : null}
      <div className='w-full h-fit flex flex-col sm:flex-row shadow-md cursor-pointer'>
        <div className='w-full sm:w-[35%] h-32 sm:max-h-full bg-yellow-400 rounded-l-md flex items-center justify-center'>
          <div className='text-sm text-blue-600 -rotate-45 font-bold'>
            Cover Picture
          </div>
        </div>
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
      <div className='flex flex-col gap-1 self-end'>
        <StarsRating
          rating={course.rate}
          starRatedColor={COLOR.ORANGE}
          numberOfStars={NUMBER_OF_STARS}
          starDimension='18px'
          starSpacing='2px'
        />
      </div>
    </button>
  );
};

export default CourseItem;
