import { LessonCompletionStatus } from 'constants/enum';
import { ITEM_NOT_FOUND } from 'constants/general';
import { CourseType, Rating, UserInfo } from 'constants/interface';

export const isYoutubeURL = (url: string) =>
  url.match(
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|shorts\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/,
  );

export const increment = (value: number) => ++value;

export const decrement = (value: number) => --value;

export const getRatingDetails = (ratings: Rating[]) => {
  const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return {
    averageRatings: ratings?.length ? total / ratings.length : 0,
    reviews: ratings.map((rate) => rate.review),
  };
};

export const getCourseInfo = (
  course: CourseType,
  userInfo: UserInfo | null,
) => {
  const isCourseCompleted =
    course?.enrollments?.findIndex(
      ({ user_id, course_id, finished }) =>
        finished && course.id === course_id && user_id === userInfo?.id,
    ) !== ITEM_NOT_FOUND;
  const isSelfTaught =
    isCourseCompleted &&
    course.lessonCompletions?.some(
      (lessonCompletion) =>
        lessonCompletion.course_id === course.id &&
        lessonCompletion.status ===
          (LessonCompletionStatus.SELF_TAUGHT as string),
    );
  const isCourseInProgress =
    !isCourseCompleted &&
    course.lessonCompletions?.some(
      (lessonCompletion) => lessonCompletion.course_id === course.id,
    );
  return { isCourseCompleted, isCourseInProgress, isSelfTaught };
};
