import { useState } from 'react';
import {
  categories,
  my_courses,
} from '../../config/constants';
import TrendingCourse from './TrendingCourse';
import moment from 'moment';

const DashboardCourse = () => {
  const [category, setCategory] = useState(0);
  return (
    <div className='w-5/6 h-3/4 flex gap-8'>
      <div className='w-3/4 h-fullflex flex-col rounded bg-gray-200/50'>
        <div className='flex items-center bg-gray-50 rounded-t'>
          {categories.map((cat, idx) => (
            <div
              onClick={() => {
                setCategory(idx);
              }}
              key={idx}
              className={`w-1/6 text-center font-semibold cursor-pointer py-1 ${
                category === 0 || category === 5
                  ? 'rounded-t'
                  : 'rounded'
              } ${
                category === idx
                  ? 'bg-[#FFD603] text-blue-900'
                  : 'bg-transparent'
              }`}
            >
              {cat}
            </div>
          ))}
        </div>
        <div className='w-full h-fit rounded-t flex flex-wrap py-6 gap-6 px-5 overflow-y-auto'>
          {my_courses.map((course, idx) => (
            <div
              key={idx}
              className='w-[48%] h-fit flex shadow-md cursor-pointer'
              // onClick={() => {
              //   setShowDetail(true);
              // }}
            >
              <div className='w-[35%] max-h-full bg-green-400 rounded-l-md flex items-center justify-center'>
                <div className='text-sm text-blue-600 -rotate-45 font-bold'>
                  Cover Picture
                </div>
              </div>
              <div className='w-[65%] h-full bg-gray-100 flex flex-col text-sm font-semibold gap-1.5 p-2 rounded-r-md'>
                <div className='text-blue-900 text-base font-bold line-clamp-1'>
                  {course.course_name}
                </div>
                <div className='line-clamp-3 leading-4 text-xs'>
                  {course.course_description}
                </div>
                <div className='flex items-center gap-2'>
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <div className='w-full flex items-center justify-between'>
                  <div className='w-fit flex gap-1 text-xs font-bold items-center'>
                    <span className='underline'>
                      Author:
                    </span>
                    {course.author}
                  </div>
                  <div className='w-fit text-blue-600 text-xs self-end'>
                    {moment(course.created_at).fromNow()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TrendingCourse />
    </div>
  );
};

export default DashboardCourse;
