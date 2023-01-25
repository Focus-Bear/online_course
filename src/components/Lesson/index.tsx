import { useLayoutEffect, useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { LessonType } from '../../utils/types';
import LessonItem from './LessonItem';

interface LessonProps {
  lessons: LessonType[];
}

const Lesson = ({ lessons }: LessonProps) => {
  const dispatch = useAppDispatch();
  //const { isEditingCourse } = useAppSelector((state) => state.user);
  // const [courseName, setCourseName] = useState(newCourse.name);
  // const [courseDescription, setCourseDescription] = useState(
  //   newCourse.description
  // );
  // const [isValid, setIsValid] = useState({
  //   name: newCourse.name !== '',
  //   description: newCourse.description !== '',
  // });
  const dummyDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    dummyDiv.current &&
      dummyDiv.current.scrollIntoView({
        behavior: 'smooth',
      });
  }, [lessons]);

  return (
    <div className='w-full h-[82%] flex flex-col gap-2 rounded-b overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-thumb-rounded'>
      {lessons.length === 0 ? (
        <div className='w-fit h-fit text-sm font-medium self-center py-10 text-black'>
          No lesson found, please add one.
        </div>
      ) : (
        lessons.map((lesson, idx) => (
          <LessonItem key={idx} lesson={lesson} position={idx} />
        ))
      )}
      <div
        className='float-left clear-both pt-1'
        style={{ float: 'left', clear: 'both' }}
        ref={dummyDiv}
      ></div>
    </div>
  );
};

export default Lesson;
