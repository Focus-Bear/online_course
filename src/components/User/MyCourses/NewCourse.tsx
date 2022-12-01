import StepWizard from 'react-step-wizard';

import close from '../../../assets/images/close.svg';
import { useAppSelector } from '../../../store/hooks';
import CourseItem from './CourseItem';

interface Props {
  setShowNewCourse: (arg: boolean) => void;
}

const NewCourse = ({ setShowNewCourse }: Props) => {
  const { newCourse } = useAppSelector(
    (state) => state.user
  );

  return (
    <div className='fixed fade inset-0 bg-gray-700 bg-opacity-50 h-full w-full z-50'>
      <div className='top-[10%] mx-auto w-[50%] h-[80%] relative'>
        <div className='w-full h-full flex flex-col items-center bg-gray-200 rounded-md relative '>
          <img
            onClick={() => setShowNewCourse(false)}
            className='absolute right-1.5 top-1.5 w-4 h-4 cursor-pointer object-cover bg-gray-200 hover:bg-gray-400'
            src={close}
            alt='Close'
          />
          <div className='w-full h-[10%] bg-blue-700 text-lg rounded-t pl-6 text-white  font-semibold flex items-center'>
            New Course
          </div>
          <div className='w-full h-[90%] flex flex-col gap-3 rounded-b px-6 py-2.5'>
            <StepWizard>
              {newCourse.map((lesson, idx) => (
                <CourseItem key={idx} lesson={lesson} />
              ))}
            </StepWizard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
