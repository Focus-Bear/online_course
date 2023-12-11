import NewCourse from 'components/common/course/NewCourse';
import { ReactNode } from 'react';
import { useAppSelector } from 'store';

const Layout = ({ children }: { readonly children: ReactNode }) => {
  const { isNewCourseModalOpened } = useAppSelector(
    (state) => state.course
  );
  return (
    <div className='w-5/6 h-3/4 flex flex-col items-center relative'>
      {children}
      {isNewCourseModalOpened && <NewCourse />}
    </div>
  );
};

export default Layout;
