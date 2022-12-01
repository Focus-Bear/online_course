import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

import add from '../../../assets/images/add.svg';
import next from '../../../assets/images/next.svg';
import previous from '../../../assets/images/previous.svg';
import link from '../../../assets/images/link.svg';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../store/hooks';
import {
  addNewLesson,
  updateNewCourse,
} from '../../../store/reducer/user';

const CourseItem = ({
  currentStep,
  nextStep,
  previousStep,
  totalSteps,
  lesson,
}: any) => {
  const dispatch = useAppDispatch();
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );
  const { newCourseLessons } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    nextStep();
  }, [newCourseLessons]);

  return (
    <div className='w-full h-fit flex flex-col gap-2'>
      <div className='w-full h-[10%] flex items-center bg-gray-300 gap-2 px-2 py-1 rounded-t-md relative'>
        <div className='font-bold text-sm'>{`Title ${currentStep}`}</div>
        <input
          className='w-2/3 outline-none rounded px-2 py-0.5 text-sm font-medium tracking-wide focus:bg-gray-50'
          value={lesson.title}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            dispatch(
              updateNewCourse({
                position: currentStep - 1,
                type: 'title',
                data: e.target.value,
              })
            );
          }}
        />
        <div className='absolute bottom-1 right-2 text-xs font-bold text-blue-600'>
          Author: John Wick
        </div>
      </div>
      <Editor
        editorState={editorState}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName='editorClassName'
        onEditorStateChange={(editorState) => {
          editorState && setEditorState(editorState);
        }}
      />
      <div className='w-full h-[15%] flex items-center justify-between bg-gray-300 px-2 py-2 rounded-b-md'>
        <div className='w-2/3 flex flex-col relative'>
          <div className='font-bold text-sm'>
            {`Youtube URL ${currentStep}`}
          </div>
          <input
            className='w-full font-medium text-sm pr-6 pl-2 py-1 rounded outline-none focus:bg-gray-50'
            value={lesson.url}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              dispatch(
                updateNewCourse({
                  position: currentStep - 1,
                  type: 'url',
                  data: e.target.value,
                })
              );
            }}
          />
          <img
            className='absolute w-4 h-4 bottom-1.5 right-1'
            src={link}
            alt=''
          />
        </div>
        <div className='w-fit flex items-center gap-4 mr-1'>
          {currentStep > 1 && (
            <img
              onClick={() => {
                previousStep();
              }}
              className='cursor-pointer'
              src={previous}
              alt='PREVIOUS'
            />
          )}
          {currentStep !== totalSteps && (
            <img
              onClick={() => {
                nextStep();
              }}
              className='cursor-pointer'
              src={next}
              alt='NEXT'
            />
          )}
          {currentStep === totalSteps && (
            <img
              onClick={() => {
                dispatch(addNewLesson());
              }}
              className='cursor-pointer'
              src={add}
              alt='ADD'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
