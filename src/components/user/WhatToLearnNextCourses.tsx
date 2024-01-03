import Spinner from 'components/Spinner';
import CoursesContentWrapper from 'components/common/CoursesContentWrapper';
import EmptyItems from 'components/common/EmptyItems';
import CourseItem from 'components/common/course/CourseItem';
import { useEffect } from 'react';
import { useAppSelector } from 'store';
import { useLazyGetUserNotEnrolledCoursesQuery } from 'store/reducer/api';

const WhatToLearnNextCourses = () => {
  const [getUserNotEnrolledCourses, { isFetching, isLoading }] =
    useLazyGetUserNotEnrolledCoursesQuery();
  const isFetchingOrLoading = isFetching || isLoading;
  const { whatToLearnCourses } = useAppSelector((state) => state.course);

  useEffect(() => {
    getUserNotEnrolledCourses();
  }, []);

  return isFetchingOrLoading ? (
    <Spinner />
  ) : whatToLearnCourses.length ? (
    <CoursesContentWrapper>
      {whatToLearnCourses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </CoursesContentWrapper>
  ) : (
    <EmptyItems message='We could not find any courses. thanks for you patient' />
  );
};

export default WhatToLearnNextCourses;
