import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, ContentState, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateNewCourse } from '../../store/reducer/user';
import { isYoutubeURL } from '../../utils/support';
import { UnmountClosed } from 'react-collapse';
import link from '../../assets/images/link.svg';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const CourseItem = ({ lesson, position }: any) => {
  const dispatch = useAppDispatch();
  const [isCollapseOpened, setIsCollapsedOpen] = useState(true);
  const [title, setTitle] = useState(lesson.title ?? '');
  const [url, setUrl] = useState(lesson.url ?? '');
  const [isValid, setIsValid] = useState({
    title: lesson.title !== '',
    url: lesson.url !== '',
    content: lesson.content !== '',
  });

  const blocksFromHTML = convertFromHTML(lesson.content);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
    )
  );
  const { details } = useAppSelector((state) => state.user);

  return (
    <div className='w-full h-fit flex flex-col gap-2 relative'>
      <div className='absolute top-1.5 text-lg right-1.5 w-fit h-fit text-white'>
        {isCollapseOpened ? (
          <MdKeyboardArrowUp />
        ) : (
          <MdKeyboardArrowDown />
        )}
      </div>
      <div
        onClick={() => {
          setIsCollapsedOpen(!isCollapseOpened);
        }}
        className='w-full h-fit text-sm font-semibold tracking-wider cursor-pointer rounded px-2 py-1  text-white bg-blue-700 hover:bg-blue-600'
      >{`Lesson ${position + 1}`}</div>
      <UnmountClosed isOpened={isCollapseOpened}>
        <div className='w-full h-[10%] flex items-center bg-gray-200 gap-2 px-2 py-1 rounded-t-md relative'>
          <div className='font-bold text-sm'>{`Title`}</div>
          <input
            className={`w-2/3 outline-none rounded px-2 py-0.5 text-sm font-medium tracking-wide focus:bg-gray-50 ${
              !isValid.title ? 'border border-red-400' : ''
            }`}
            value={title}
            onChange={({
              target: { value },
            }: React.ChangeEvent<HTMLInputElement>) => {
              if (value) {
                dispatch(
                  updateNewCourse({
                    position,
                    type: 'title',
                    data: value,
                  })
                );
                setIsValid({ ...isValid, title: true });
              } else setIsValid({ ...isValid, title: false });
              setTitle(value);
            }}
          />
          <div className='absolute top-1/2 -translate-y-1/2 right-2 text-sm uppercase font-bold text-blue-700'>
            {details?.nickname}
          </div>
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName={`editorClassName ${
            !isValid.content ? 'editorEmptyClassName' : ''
          }`}
          onEditorStateChange={(state) => {
            setEditorState(state);
            let content = convertToHTML(state.getCurrentContent());
            if (content && content !== '<p></p>') {
              dispatch(
                updateNewCourse({
                  position,
                  type: 'content',
                  data: content,
                })
              );
              setIsValid({ ...isValid, content: true });
            } else {
              setIsValid({ ...isValid, content: false });
            }
          }}
        />
        <div className='w-full h-[15%] flex items-center justify-between bg-gray-200 px-2 py-2 rounded-b-md relative'>
          <div className='w-[15%] font-bold text-sm'>{`Youtube URL`}</div>
          <input
            className={`w-[85%] font-medium text-sm pr-7 pl-2 py-1 rounded outline-none focus:bg-gray-50 ${
              !isValid.url ? 'border border-red-400' : ''
            }`}
            value={url}
            onChange={({
              target: { value },
            }: React.ChangeEvent<HTMLInputElement>) => {
              if (isYoutubeURL(value)) {
                dispatch(
                  updateNewCourse({
                    position,
                    type: 'url',
                    data: value,
                  })
                );
                setIsValid({ ...isValid, url: true });
              } else setIsValid({ ...isValid, url: false });
              setUrl(value);
            }}
          />
          <img
            className='absolute w-4 h-4 bottom-3.5 right-4'
            src={link}
            alt=''
          />
        </div>
      </UnmountClosed>
    </div>
  );
};

export default CourseItem;
