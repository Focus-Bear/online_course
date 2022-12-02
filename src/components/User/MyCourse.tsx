import { useState } from 'react';
import moment from 'moment';
import { MdHourglassEmpty } from 'react-icons/md';
import { useAppSelector } from '../../store/hooks';
import StarsRating from 'react-star-ratings';
import ViewCourse from '../Course/ViewCourse';

const MyCourse = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(-1);
  const [showCourseDetail, setShowCourseDetail] = useState(false);
  const { courses } = useAppSelector((state) => state.user);

  return (
    <>
      <div className='w-full h-[80%] bg-gray-200/50 rounded-t flex flex-wrap gap-6 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-track-rounded scrollbar-thumb-rounded'>
        {courses.length === 0 ? (
          <div className='w-full h-full text-2xl font-semibold flex items-center justify-center gap-2'>
            <MdHourglassEmpty />
            You've created any course yet.
          </div>
        ) : (
          courses.map((course, idx) => (
            <div
              key={idx}
              className='w-[32%] h-fit flex shadow-md cursor-pointer'
              onClick={() => {
                setSelectedCourseId(idx);
                setShowCourseDetail(true);
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
      </div>
      {showCourseDetail && selectedCourseId !== -1 && (
        <ViewCourse
          id={selectedCourseId}
          setShowCourseDetail={setShowCourseDetail}
        />
      )}
    </>
  );
};

export default MyCourse;
