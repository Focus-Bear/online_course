import { useEffect, useState } from 'react';
import ModalOverlay from '../ModalOverlay';
import ModalContentWrapper from '../ModalContentWrapper';
import { MODAL_TYPE, USER_TAB } from 'constants/general';
import { MdSend } from 'react-icons/md';
import { useAppSelector } from 'store';
import EmptyItems from '../EmptyItems';
import {
  useAddCourseReviewMutation,
  useLazyGetCourseReviewsQuery,
} from 'store/reducer/api';
import Spinner from 'components/Spinner';

const CourseReviewsModal = () => {
  const [comment, setComment] = useState('');
  const {
    course: {
      reviews: { comments, course_id, userRating },
    },
    setting: { currentTab },
  } = useAppSelector((state) => state);
  const [getReviews, { isLoading, isFetching }] =
    useLazyGetCourseReviewsQuery();
  const [createReview, { isLoading: isSaving }] =
    useAddCourseReviewMutation();

  useEffect(() => {
    getReviews(course_id);
  }, []);

  return (
    <ModalOverlay>
      <ModalContentWrapper modal={MODAL_TYPE.REVIEWS}>
        <div className='w-full flex flex-col items-center gap-4'>
          {currentTab === USER_TAB.ENROLLED_COURSES.tabIndex &&
          !userRating.review ? (
            <div className='w-5/6 flex gap-2'>
              <input
                value={comment}
                onChange={({ target: { value } }) => setComment(value)}
                className='inputBasic'
                placeholder='write...'
              />
              {isSaving ? (
                <div className='w-6 h-6 rounded-full border-t border-gray-800 animate-spin'></div>
              ) : (
                <button
                  onClick={() => {
                    createReview(
                      userRating
                        ? { ...userRating, review: comment }
                        : { course_id, rating: 0, review: comment }
                    );
                  }}
                  disabled={comment === ''}
                  className='bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 disabled:bg-gray-400'
                >
                  <MdSend />
                </button>
              )}
            </div>
          ) : null}

          <div className='w-full min-h-[30vh] h-fit max-h-[65vh] flex flex-col gap-3 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500'>
            {isFetching || isLoading ? (
              <Spinner />
            ) : comments.length ? (
              comments.map((review, index) => (
                <p
                  key={index}
                  className='p-2 sm:p-3 bg-gray-200 rounded-md shadow-md font-medium text-xs sm:text-sm tracking-wide mx-2'
                >
                  {review}
                </p>
              ))
            ) : (
              <EmptyItems message='No comments found.' />
            )}
          </div>
        </div>
      </ModalContentWrapper>
    </ModalOverlay>
  );
};

export default CourseReviewsModal;
