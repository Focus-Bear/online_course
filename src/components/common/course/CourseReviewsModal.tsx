import { useEffect, useMemo, useState } from 'react';
import ModalOverlay from '../ModalOverlay';
import ModalContentWrapper from '../ModalContentWrapper';
import { MODAL_TYPE, NUMBER_OF_STARS, USER_TAB } from 'constants/general';
import { MdSend } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from 'store';
import EmptyItems from '../EmptyItems';
import {
  useCreateCourseRatingMutation,
  useLazyGetCourseReviewsQuery,
} from 'store/reducer/api';
import Spinner from 'components/Spinner';
import StarsRating from 'react-star-ratings';
import COLOR from 'constants/color';
import moment from 'moment';
import { updateConfirmModal } from 'store/reducer/setting';

const ReviewInput = () => {
  const dispatch = useAppDispatch();
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const {
    reviews: { course_id },
  } = useAppSelector((state) => state.course);
  const [createReview, { isLoading: isSaving }] =
    useCreateCourseRatingMutation();

  const handleCreateReview = () => {
    dispatch(
      updateConfirmModal({
        isOpen: false,
      })
    );
    createReview({
      course_id,
      rating: review.rating,
      review: review.comment,
    });
  };

  return (
    <div className='w-full flex flex-col gap-1 py-2 px-4 sm:px-6 relative'>
      <div className='w-full flex gap-2'>
        <input
          value={review.comment}
          onChange={({ target: { value } }) =>
            setReview((prev) => ({ ...prev, comment: value }))
          }
          className='inputBasic font-semibold tracking-wide py-1'
          placeholder='Leave review...'
        />
        <button
          onClick={() => {
            if (!review.rating) {
              dispatch(
                updateConfirmModal({
                  content: 'Please rate the course first.',
                  isOpen: true,
                })
              );
            } else {
              dispatch(
                updateConfirmModal({
                  content: 'Are you sure, You cannot undo the review?',
                  isOpen: true,
                  onConfirm: handleCreateReview,
                })
              );
            }
          }}
          disabled={Boolean(!review.comment)}
          className='bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 disabled:bg-gray-400'
        >
          <MdSend />
        </button>
      </div>
      <StarsRating
        rating={review.rating}
        starRatedColor={COLOR.ORANGE}
        numberOfStars={NUMBER_OF_STARS}
        starDimension='23px'
        starSpacing='4px'
        changeRating={(rating) =>
          setReview((prev) => ({ ...prev, rating }))
        }
      />
      {isSaving ? (
        <div className='absolute top-0 left-0 w-full h-full bg-gray-600/50 flex items-center justify-center rounded-md'>
          <div className='w-5 h-5 rounded-full border-t-2 border-gray-200 animate-spin'></div>
        </div>
      ) : null}
    </div>
  );
};

const CourseReviewsModalBody = () => {
  const {
    course: {
      reviews: { ratings, course_id },
    },
    setting: { currentTab },
    user: { details },
  } = useAppSelector((state) => state);
  const [getReviews, { isLoading, isFetching }] =
    useLazyGetCourseReviewsQuery();

  const shouldShowReviewInput = useMemo(
    () =>
      currentTab === USER_TAB.ENROLLED_COURSES.tabIndex &&
      !(ratings ?? []).find((rating) => rating.user_id === details?.id),
    [currentTab]
  );

  useEffect(() => {
    course_id && getReviews(course_id);
  }, []);

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      {shouldShowReviewInput ? <ReviewInput /> : null}
      <div className='w-full min-h-[30vh] h-fit max-h-[65vh] flex flex-col gap-3 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500'>
        {isFetching || isLoading ? (
          <Spinner />
        ) : ratings.length ? (
          ratings.map((rating, index) => (
            <div
              key={index}
              className='flex flex-col px-2.5 py-2 bg-gray-100 rounded-md shadow font-medium text-xs sm:text-sm tracking-wide relative'
            >
              <p>{rating.review}</p>
              <StarsRating
                rating={rating.rating}
                starRatedColor={COLOR.ORANGE}
                numberOfStars={NUMBER_OF_STARS}
                starDimension='14px'
                starSpacing='1px'
              />
              <span className='absolute -bottom-5 right-1 text-xs text-gray-700'>
                {moment(rating.created_at).fromNow()}
              </span>
            </div>
          ))
        ) : (
          <EmptyItems message='No reviews found.' />
        )}
      </div>
    </div>
  );
};

const CourseReviewsModal = () => (
  <ModalOverlay>
    <ModalContentWrapper title='Reviews' modal={MODAL_TYPE.REVIEWS}>
      <CourseReviewsModalBody />
    </ModalContentWrapper>
  </ModalOverlay>
);

export default CourseReviewsModal;
