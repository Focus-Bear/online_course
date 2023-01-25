import { useState, useEffect } from 'react';
import moment from 'moment';
import { MdHourglassEmpty } from 'react-icons/md';
import { useAppSelector } from '../../store/hooks';
import StarsRating from 'react-star-ratings';
import { useLazyGetAllCourseQuery } from '../../store/reducer/api';
import Spinner from '../Spinner';
import CourseDetails from '../Course/CourseDetails';
import CourseItem from '../Course/CourseItem';

const MyCourse = () => {
  const { isCourseFetching, courses } = useAppSelector(
    (state) => state.course
  );
  const [selectedCourseId, setSelectedCourseId] = useState(-1);
  const [showCourseDetail, setShowCourseDetail] = useState(false);
  const [getAllCourse] = useLazyGetAllCourseQuery();

  useEffect(() => {
    // getAllCourse();
  }, []);

  const handleCourseSelection = (idx: number) => {
    setSelectedCourseId(idx);
    setShowCourseDetail(true);
  };
  return (
    <>
      <div className='w-full h-[80%] bg-gray-200/50 rounded-t flex flex-wrap gap-6 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-track-rounded scrollbar-thumb-rounded'>
        {isCourseFetching ? (
          <Spinner />
        ) : courses.length === 0 ? (
          <div className='w-full h-full text-2xl font-semibold flex items-center justify-center gap-2'>
            <MdHourglassEmpty />
            You've not created any course yet.
          </div>
        ) : (
          courses.map((course, idx) => (
            <CourseItem
              index={idx}
              course={course}
              handleCourseSelection={handleCourseSelection}
            />
          ))
        )}
      </div>
      {showCourseDetail && selectedCourseId !== -1 && (
        <CourseDetails
          id={selectedCourseId}
          setShowCourseDetail={setShowCourseDetail}
        />
      )}
    </>
  );
};

export default MyCourse;
