import moment from 'moment';
import { MdHourglassEmpty } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import StarsRating from 'react-star-ratings';
import NewCourse from '../Course/NewCourse';
import { editCourseContent } from '../../store/reducer/user';

const Courses = () => {
  const dispatch = useAppDispatch();
  const { courses, isEditingCourse } = useAppSelector(
    (state) => state.user
  );

  return (
    <div className='w-full h-full flex gap-4'>
      {courses.length === 0 ? (
        <div className='w-full py-20 text-xl font-semibold flex items-center justify-center gap-2'>
          <MdHourglassEmpty />
          No course found.
        </div>
      ) : (
        courses.map((course, idx) => (
          <div
            key={idx}
            className='w-[32%] h-fit flex shadow-md cursor-pointer'
            onClick={() => {
              dispatch(editCourseContent(course));
            }}
          >
            <div className='w-[35%] max-h-full bg-yellow-400 rounded-l-md flex items-center justify-center'>
              <div className='text-sm text-blue-600 -rotate-45 font-bold'>
                Cover Picture
              </div>
            </div>
            <div className='w-[65%] h-full bg-gray-100 flex flex-col text-sm font-semibold gap-1.5 p-2 rounded-r-md'>
              <div className='text-blue-900 text-base font-bold line-clamp-1'>
                {course.name}
              </div>
              <div className='line-clamp-2 leading-4 text-xs'>
                {course.description}
              </div>
              <div className='flex items-center gap-2'>
                <StarsRating
                  rating={course.rate}
                  starRatedColor='orange'
                  numberOfStars={5}
                  starDimension='18px'
                  starSpacing='2px'
                />
              </div>
              <div className='w-full flex items-center justify-between'>
                <div className='w-fit flex gap-1 text-xs font-bold items-center'>
                  <span className='underline'>Author:</span>
                  {course.author}
                </div>
                <div className='w-fit text-blue-600 text-xs self-end'>
                  {moment(course.created_at).fromNow()}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {isEditingCourse && <NewCourse />}
    </div>
  );
};

export default Courses;
