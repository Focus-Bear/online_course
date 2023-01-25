import StepWizard from 'react-step-wizard';
import { useAppSelector } from '../../store/hooks';
import ViewCourseItem from './ViewCourseItem';

const ViewCourse = ({
  id,
  setShowCourseDetail,
}: {
  id: number;
  setShowCourseDetail: (value: boolean) => void;
}) => {
  // const { courses } = useAppSelector((state) => state.user);
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-50'>
      {/* <div className='relative top-1/2 -translate-y-1/2 mx-auto w-5/6 h-[77%] flex items-center'>
        <button
          onClick={() => {
            setShowCourseDetail(false);
          }}
          className='absolute -top-6 right-0 w-fit h-fit text-sm bg-black rounded px-1.5 text-white z-50'
        >
          X
        </button>
        <StepWizard className='step-wizard-wrapper'>
          {courses[id].lessons.map((course, index) => (
            <ViewCourseItem key={index} course={course} />
          ))}
        </StepWizard>
      </div> */}
    </div>
  );
};

export default ViewCourse;
