import { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import close from '../../assets/images/close.svg';
import { MdSave } from 'react-icons/md';
import { useCreateCourseMutation } from '../../store/reducer/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateIsNewCourseModalOpened } from '../../store/reducer/user';
import { localCreateCourse } from '../../store/reducer/course';

const NewCourse = () => {
  const dispatch = useAppDispatch();
  const { isCreatingCourse } = useAppSelector((state) => state.course);
  //const [createCourse] = useCreateCourseMutation();
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [isValid, setIsValid] = useState({
    name: false,
    description: false,
  });

  return (
    <div className='fixed fade inset-0 bg-gray-700 bg-opacity-40 h-full w-full z-50'>
      <div className='top-1/3 mx-auto w-[50%] h-fit relative'>
        <div className='w-full h-full flex flex-col gap-3 items-center bg-gray-300 rounded-md relative'>
          <div className='absolute right-2 top-1.5 w-fit h-fit'>
            <ReactTooltip
              id='exit'
              place='right'
              type='dark'
              effect='float'
            />
            <img
              data-for='exit'
              data-tip='Exit'
              className='w-5 h-5 cursor-pointer object-cover bg-gray-200 hover:bg-gray-400'
              src={close}
              alt='Close'
              onClick={() => {
                dispatch(updateIsNewCourseModalOpened(false));
              }}
            />
          </div>
          <div className='w-full h-fit bg-gray-200 text-lg rounded px-6 pt-2 pb-4 gap-1.5 text-gray-700 font-semibold flex flex-col justify-center'>
            <div className='w-fit h-fit text-base italic font-bold leading-4'>
              Create New Course
            </div>
            <div className='w-full flex flex-col items-center gap-4'>
              <div className='w-full flex flex-col gap-0.5'>
                <div className='text-xs font-bold'>Name</div>
                <input
                  disabled={isCreatingCourse}
                  className={`w-full outline-none text-sm bg-gray-100 focus:bg-gray-50 rounded px-2 py-1 text-gray-700 ${
                    !isValid.name ? 'border border-red-400' : ''
                  }`}
                  type='text'
                  value={courseName}
                  onChange={({
                    target: { value },
                  }: React.ChangeEvent<HTMLInputElement>) => {
                    if (value) {
                      setIsValid({ ...isValid, name: true });
                    } else setIsValid({ ...isValid, name: false });
                    setCourseName(value);
                  }}
                />
              </div>
              <div className='w-full flex flex-col gap-0.5'>
                <div className='text-xs font-bold'>Description</div>
                <textarea
                  disabled={isCreatingCourse}
                  rows={6}
                  className={`w-full outline-none bg-gray-100 focus:bg-gray-50 text-sm text-gray-700 resize-none rounded px-1.5 py-1 ${
                    !isValid.description ? 'border border-red-400' : ''
                  }`}
                  value={courseDescription}
                  onChange={({
                    target: { value },
                  }: React.ChangeEvent<HTMLTextAreaElement>) => {
                    if (value) {
                      setIsValid({
                        ...isValid,
                        description: true,
                      });
                    } else {
                      setIsValid({
                        ...isValid,
                        description: false,
                      });
                    }
                    setCourseDescription(value);
                  }}
                ></textarea>
              </div>
              {isCreatingCourse ? (
                <div className='w-4 h-4 px-2 py-1 rounded-full border-blue-600 border-t animate-spin self-end'></div>
              ) : (
                <button
                  onClick={() => {
                    // createCourse({
                    //   name: courseName,
                    //   description: courseDescription,
                    // });
                    dispatch(
                      localCreateCourse({
                        name: courseName,
                        description: courseDescription,
                        lessons: [],
                      })
                    );
                    dispatch(updateIsNewCourseModalOpened(false));
                  }}
                  className='w-fit h-fit px-4 py-1 self-end text-sm rounded-md tracking-wide bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1.5'
                >
                  SAVE
                  <MdSave className='text-base' />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
