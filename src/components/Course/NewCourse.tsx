import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ReactTooltip from 'react-tooltip';
import CourseItem from './CourseItem';
import {
  addNewLesson,
  resetNewCourse,
  saveCourse,
  updateCourse,
  updateNewCourse,
} from '../../store/reducer/user';

import close from '../../assets/images/close.svg';
import { MdSave } from 'react-icons/md';

const NewCourse = ({}) => {
  const dispatch = useAppDispatch();
  const { newCourse, isEditingCourse } = useAppSelector(
    (state) => state.user
  );
  const [courseName, setCourseName] = useState(newCourse.name);
  const [courseDescription, setCourseDescription] = useState(
    newCourse.description
  );
  const [isValid, setIsValid] = useState({
    name: newCourse.name !== '',
    description: newCourse.description !== '',
  });

  const handleSave = () => {
    isEditingCourse
      ? dispatch(updateCourse())
      : dispatch(saveCourse(newCourse));
  };

  //const validation = () => {};

  return (
    <div className='fixed fade inset-0 bg-gray-700 bg-opacity-50 h-full w-full z-50'>
      <div className='top-[5%] mx-auto w-[50%] h-[85%] relative'>
        <div className='w-full h-full flex flex-col items-center bg-gray-200 rounded-md relative'>
          <div className='absolute right-2 top-1.5 w-fit h-fit flex items-center gap-3'>
            <button
              onClick={() => {
                dispatch(addNewLesson());
              }}
              className='w-fit h-fit text-xs tracking-wider font-semibold text-white bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded self-center'
            >
              New Lesson
            </button>
            <div className='w-fit h-fit'>
              <ReactTooltip
                id='save'
                place='top'
                type='dark'
                effect='float'
              />
              <MdSave
                data-for='save'
                data-tip='Save Course'
                data-iscapture='true'
                onClick={handleSave}
                className='w-fit h-fit text-white bg-black hover:text-gray-300 cursor-pointer p-0.5 text-[18px] rounded'
              />
            </div>
            <div className='w-fit h-fit'>
              <ReactTooltip
                id='exit'
                place='right'
                type='dark'
                effect='float'
              />
              <img
                data-for='exit'
                data-tip='Exit'
                onClick={() => {
                  dispatch(resetNewCourse());
                }}
                className='w-5 h-5 cursor-pointer object-cover bg-gray-200 hover:bg-gray-400'
                src={close}
                alt='Close'
              />
            </div>
          </div>
          <div className='w-full h-fit bg-blue-700 text-lg rounded-t px-6 py-4 gap-1.5 text-white  font-semibold flex flex-col justify-center'>
            <div className='w-fit h-fit text-base italic font-bold leading-4'>
              Create New Course
            </div>
            <div className='w-full flex items-center gap-4'>
              <div className='w-2/5 flex flex-col gap-0.5'>
                <div className='text-xs font-semibold'>Name</div>
                <input
                  className={`w-full outline-none text-sm bg-gray-50 focus:bg-gray-100 rounded px-2 py-1 text-gray-700 ${
                    !isValid.name ? 'border border-red-400' : ''
                  }`}
                  type='text'
                  value={courseName}
                  onChange={({
                    target: { value },
                  }: React.ChangeEvent<HTMLInputElement>) => {
                    if (value) {
                      dispatch(
                        updateNewCourse({
                          type: 'name',
                          data: value,
                        })
                      );
                      setIsValid({ ...isValid, name: true });
                    } else setIsValid({ ...isValid, name: false });
                    setCourseName(value);
                  }}
                />
              </div>
              <div className='w-3/5 flex flex-col gap-0.5'>
                <div className='text-xs font-semibold'>Description</div>
                <textarea
                  rows={1}
                  className={`w-full outline-none bg-gray-50 text-sm text-gray-700 resize-none rounded focus:bg-gray-100 px-1.5 py-1 ${
                    !isValid.description ? 'border border-red-400' : ''
                  }`}
                  value={courseDescription}
                  onChange={({
                    target: { value },
                  }: React.ChangeEvent<HTMLTextAreaElement>) => {
                    if (value) {
                      dispatch(
                        updateNewCourse({
                          type: 'description',
                          data: value,
                        })
                      );
                      setIsValid({
                        ...isValid,
                        description: true,
                      });
                    } else
                      setIsValid({
                        ...isValid,
                        description: false,
                      });
                    setCourseDescription(value);
                  }}
                ></textarea>
              </div>
            </div>
          </div>
          <div className='w-full h-[82%] flex flex-col gap-3 rounded-b px-5 py-3 overflow-y-auto scrollbar-thin scrollbar-track-blue-200 scrollbar-thumb-blue-600 scrollbar-track-rounded  scrollbar-thumb-rounded'>
            {newCourse.lessons.map((lesson, idx) => (
              <CourseItem key={idx} lesson={lesson} position={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
