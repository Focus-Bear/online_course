import { useState } from 'react';
import moment from 'moment';
import { my_courses } from '../../../config/constants';
import CourseDetail from './CourseDetail';

const MyCourses = () => {
  const [selectedCourse, setSelectedCourse] =
    useState<any>();
  const [showDetail, setShowDetail] = useState(false);

  const handleCourseSelection = (data: any) => {
    setSelectedCourse(data);
    setShowDetail(true);
  };

  return (
    <>
      <div className='w-5/6 h-3/4 bg-gray-200/50 rounded flex flex-col'>
        <div className='w-full h-fit rounded-t flex flex-wrap py-6 justify-evenly overflow-y-auto'>
          {my_courses.map((course, idx) => (
            <div
              key={idx}
              className='w-[30%] h-fit flex shadow-md cursor-pointer'
              onClick={() => {
                handleCourseSelection(course);
              }}
            >
              <div className='w-[35%] max-h-full bg-yellow-400 rounded-l-md flex items-center justify-center'>
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
      {showDetail && (
        <CourseDetail
          course={selectedCourse}
          setShowDetail={setShowDetail}
        />
      )}
    </>
  );
};

export default MyCourses;
