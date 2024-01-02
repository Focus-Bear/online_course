import { ReactNode } from 'react';

const CoursesContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full h-full  rounded-t grid grid-rows-none sm:grid-rows-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-5 sm:gap-y-36 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-track-rounded scrollbar-thumb-rounded'>
      {children}
    </div>
  );
};

export default CoursesContentWrapper;
