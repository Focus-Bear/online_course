import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, ContentState, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { useAppDispatch } from 'store';
import { increment, isYoutubeURL } from 'utils/support';
import { UnmountClosed } from 'react-collapse';
import { MdKeyboardArrowDown, MdLink } from 'react-icons/md';
import Trash from 'assets/svg/Trash';
import COLOR from 'constants/color';
import ReactTooltip from 'react-tooltip';
import {
  removeCourseLesson,
  updateCourseDetails,
} from 'store/reducer/course';
import {
  COURSE_FEATURE,
  DragTypes,
  EMPTY_TEXT_EDITOR,
  TEXT_EDITOR,
} from 'constants/general';
import _ from 'lodash';
import { Lesson } from 'constants/interface';
import { useDeleteCourseLessonMutation } from 'store/reducer/api';
import { t } from 'i18next';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { FaGripVertical } from 'react-icons/fa';

interface LessonItemHeaderProps {
  readonly position: number;
  isCollapseOpened: boolean;
  setIsCollapsedOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
}

interface LessonItemProps {
  lesson: Lesson;
  position: number;
  course_id: string;
  title?: string;
  handleDrop: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const LessonItemHeader = ({
  position,
  isCollapseOpened,
  setIsCollapsedOpen,
  title,
}: LessonItemHeaderProps) => {
  return (
    <>
      <div
        onClick={() => {
          setIsCollapsedOpen(!isCollapseOpened);
        }}
        className='w-full h-fit font-semibold tracking-wider cursor-pointer rounded px-2.5 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm sm:text-base relative'
      >
        <p className='w-11/12 truncate'>
          {t('lesson.lesson_title', { position: increment(position) })}
          {title ? <span className='italic'>{`- ${title}`}</span> : null}
        </p>
        <MdKeyboardArrowDown
          className={`absolute top-1/2 -translate-y-1/2 right-2 w-6 h-auto ${
            isCollapseOpened ? 'rotate-180' : 'rotate-0'
          } duration-200 ease-in-out`}
        />
      </div>
    </>
  );
};

const LessonItem = ({
  lesson,
  position,
  course_id,
  title,
  handleDrop,
}: LessonItemProps) => {
  const dispatch = useAppDispatch();
  const [isCollapseOpened, setIsCollapsedOpen] = useState(true);
  const blocksFromHTML = convertFromHTML(lesson.content);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      ),
    ),
  );
  const [deleteCourseLesson, { isLoading: isDeleting }] =
    useDeleteCourseLessonMutation();

  const ref = useRef<HTMLDivElement>(null);
  const [handlerId, drop] = useDrop<DragItem, void>({
    collect(monitor) {
      return monitor.getHandlerId();
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = position;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY =
        (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      handleDrop(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    accept: DragTypes.LESSON,
  });

  const [__, drag] = useDrag({
    type: DragTypes.LESSON,
    item: () => {
      return { id: lesson.id, index: position };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className='w-full h-fit flex items-start gap-1'>
      <button data-handler-id={handlerId} className='cursor-move'>
        <FaGripVertical />
      </button>
      <div className='w-full flex flex-col'>
        <LessonItemHeader
          position={position}
          isCollapseOpened={isCollapseOpened}
          setIsCollapsedOpen={setIsCollapsedOpen}
          title={title}
        />
        <UnmountClosed isOpened={isCollapseOpened}>
          <div className='w-full flex items-center py-4'>
            <p className='w-[10%] font-bold'>{t('course.title')}</p>
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
                  }),
                )
              }
            />
          </div>
          <Editor
            toolbar={TEXT_EDITOR.TOOLBAR}
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
                    }),
                  );
                return state;
              });
            }}
          />
          <div className='w-full flex gap-2 items-center justify-between relative'>
            <p className='min-w-max w-[22%] font-bold'>
              {t('lesson.youtube_url')}
            </p>
            <input
              className={`w-full font-medium text-sm pr-7 pl-2 py-1 rounded outline-none focus:bg-gray-50 ${
                lesson.url &&
                !isYoutubeURL(lesson.url) &&
                'border border-red-400'
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
                  }),
                );
              }}
            />
            <MdLink className='absolute w-4 h-4 top-1/2 -translate-y-1/2 right-2' />
          </div>
          {isDeleting ? (
            <div className='w-5 h-5 border-t border-black rounded-full animate-spin self-end'></div>
          ) : (
            <div className='w-full flex items-center justify-end gap-2 mt-2'>
              <button
                onClick={() => {
                  lesson?.id
                    ? deleteCourseLesson({
                        lesson_id: lesson.id,
                        course_id,
                        position,
                      })
                    : dispatch(removeCourseLesson(position));
                }}
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
                {t('delete')}
              </ReactTooltip>
            </div>
          )}
        </UnmountClosed>
      </div>
    </div>
  );
};

export default LessonItem;
