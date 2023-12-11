import { Dispatch, SetStateAction, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, ContentState, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { useAppDispatch, useAppSelector } from 'store';
import { increment, isYoutubeURL } from 'utils/support';
import { UnmountClosed } from 'react-collapse';
import { MdKeyboardArrowDown, MdLink, MdSave } from 'react-icons/md';
import Trash from 'assets/svg/Trash';
import COLOR from 'constants/color';
import ReactTooltip from 'react-tooltip';
import {
  removeCourseLesson,
  updateCourseDetails,
} from 'store/reducer/course';
import { COURSE_FEATURE, EMPTY_TEXT_EDITOR } from 'constants/general';
import { useUpdateCourseLessonMutation } from 'store/reducer/api';

const LessonItemHeader = ({
  position,
  isCollapseOpened,
  setIsCollapsedOpen,
}: {
  readonly position: number;
  isCollapseOpened: boolean;
  setIsCollapsedOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div
        onClick={() => {
          setIsCollapsedOpen(!isCollapseOpened);
        }}
        className='w-full h-fit font-semibold tracking-wider cursor-pointer rounded px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm sm:text-base relative'
      >
        {`Lesson ${increment(position)}`}
        <MdKeyboardArrowDown
          className={`absolute top-1/2 -translate-y-1/2 right-2 w-6 h-auto ${
            isCollapseOpened ? 'rotate-180' : 'rotate-0'
          } duration-200 ease-in-out`}
        />
      </div>
    </>
  );
};

const LessonItem = ({ lesson, position }: any) => {
  const dispatch = useAppDispatch();
  const [isCollapseOpened, setIsCollapsedOpen] = useState(true);
  const blocksFromHTML = convertFromHTML(lesson.content);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
    )
  );
  const [updateLesson, { isLoading }] = useUpdateCourseLessonMutation();
  const shouldAllowAddOrSaveLessons =
    lesson.title && lesson.content && lesson.content !== EMPTY_TEXT_EDITOR;
  const { course: course_details } = useAppSelector(
    (state) => state.course
  );

  return (
    <div className='w-full h-fit flex flex-col pr-0.5'>
      <LessonItemHeader
        position={position}
        isCollapseOpened={isCollapseOpened}
        setIsCollapsedOpen={setIsCollapsedOpen}
      />
      <UnmountClosed isOpened={isCollapseOpened}>
        <div className='w-full flex items-center py-4'>
          <p className='w-[10%] font-bold'>Title</p>
          <input
            className={`w-full outline-none rounded px-2 py-1 text-sm font-medium tracking-wide focus:bg-gray-50 ${
              !lesson.title && 'border border-red-400'
            }`}
            value={lesson.title}
            onChange={({
              target: { value },
            }: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(
                updateCourseDetails({
                  position,
                  value,
                  course_feature: COURSE_FEATURE.TITLE,
                })
              )
            }
          />
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName={`editorClassName ${
            !lesson.content && 'editorEmptyClassName'
          }`}
          onEditorStateChange={(state) => {
            setEditorState(() => {
              const content = convertToHTML(state.getCurrentContent());
              content &&
                content !== EMPTY_TEXT_EDITOR &&
                dispatch(
                  updateCourseDetails({
                    position,
                    value: content,
                    course_feature: COURSE_FEATURE.CONTENT,
                  })
                );
              return state;
            });
          }}
        />
        <div className='w-full flex gap-2 items-center justify-between relative'>
          <p className='min-w-max w-[22%] font-bold'>Youtube URL</p>
          <input
            className={`w-full font-medium text-sm pr-7 pl-2 py-1 rounded outline-none focus:bg-gray-50 ${
              lesson.url === ''
                ? ''
                : isYoutubeURL(lesson.url)
                ? 'border border-red-400'
                : ''
            }`}
            value={lesson.url}
            onChange={({
              target: { value },
            }: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                updateCourseDetails({
                  position,
                  value,
                  course_feature: COURSE_FEATURE.URL,
                })
              );
            }}
          />
          <MdLink className='absolute w-4 h-4 top-1/2 -translate-y-1/2 right-2' />
        </div>
        <div className='w-full flex items-center justify-end gap-2 mt-2'>
          {isLoading ? (
            <div className='w-5 h-5 border-t border-gray-800 animate-spin rounded-full mt-1'></div>
          ) : (
            <MdSave
              data-for='update_lesson'
              data-tip='Update Lesson'
              onClick={() => {
                //TODO: check the BE endpoint
                shouldAllowAddOrSaveLessons &&
                  updateLesson({
                    course_id: course_details.id,
                    lesson_id: lesson.id,
                    title: lesson.title,
                    content: lesson.content,
                    url: lesson.url,
                  });
              }}
              className={`w-auto h-7 rounded p-0.5 cursor-pointer outline-none ${
                shouldAllowAddOrSaveLessons
                  ? 'text-gray-800'
                  : 'text-gray-400'
              } leading-3`}
            />
          )}
          <button
            onClick={() => dispatch(removeCourseLesson(position))}
            data-tip
            data-for='delete_lesson'
            className='mx-2 mt-1 self-start'
          >
            <Trash fill={COLOR.RED} style='w-5 h-auto' />
          </button>
          <ReactTooltip
            id='delete_lesson'
            place='left'
            type='dark'
            effect='float'
          >
            Delete Lesson
          </ReactTooltip>
          <ReactTooltip
            id='update_lesson'
            place='left'
            type='dark'
            effect='float'
          />
        </div>
      </UnmountClosed>
    </div>
  );
};

export default LessonItem;
