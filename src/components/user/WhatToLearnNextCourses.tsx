import Spinner from 'components/common/Spinner';
import CoursesContentWrapper from 'components/common/CoursesContentWrapper';
import EmptyItems from 'components/common/EmptyItems';
import CourseItem from 'components/course/CourseItem';
import { t } from 'i18next';
import { useEffect } from 'react';
import { useAppSelector } from 'store';
import { useLazyGetUserNotEnrolledCoursesQuery } from 'store/reducer/api';
import CourseHighlights from 'components/course/CourseHighlights';

const WhatToLearnNextCourses = () => {
  const [getUserNotEnrolledCourses, { isFetching, isLoading }] =
    useLazyGetUserNotEnrolledCoursesQuery();
  const isFetchingOrLoading = isFetching || isLoading;
  const { whatToLearnCourses, showCourseHighlights } = useAppSelector(
    (state) => state.course,
  );

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
      {showCourseHighlights && <CourseHighlights />}
    </CoursesContentWrapper>
  ) : (
    <EmptyItems message={t('course.we_could_not_find_any_courses')} />
  );
};

export default WhatToLearnNextCourses;
