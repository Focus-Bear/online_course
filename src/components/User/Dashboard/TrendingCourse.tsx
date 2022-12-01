import Rate from 'rsuite/Rate';
import { trending_courses } from '../../../config/constants';

const TrendingCourse = () => {
  return (
    <div className='w-1/4 h-full orounded flex flex-col px-4 py-2 gap-2 bg-gray-100 rounded overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-track-rounded scrollbar-thumb-rounded'>
      <div className='font-bold text-blue-900'>
        Trending Courses
      </div>
      {trending_courses.map((item, index) => (
        <div
          key={index}
          className='w-full h-fit flex flex-col bg-gray-600 hover:bg-gray-700 cursor-pointer text-white rounded-md gap-1.5 p-1.5 mb-2'
        >
          <div className='text-xs font-semibold italic'>
            {item.title}
          </div>
          <div className='text-xs font-semibold leading-3'>
            {item.content}
          </div>

          <div className='flex items-center gap-4'>
            <div className='text-xs font-semibold underline'>
              Author: {item.author}
            </div>
            <div className='w-fit text-xs font-semibold text-yellow-600'>
              {item.rating}
              <Rate defaultValue={3} />
            </div>
            <div className='w-fit text-xs font-semibold text-orange-500 self-end'>
              {item.student_no} students
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingCourse;
