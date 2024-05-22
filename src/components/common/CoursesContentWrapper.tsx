import { ReactNode } from 'react';
import { useAppSelector } from 'store';

const CoursesContentWrapper = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAppSelector((state) => state.user);
  return (
    <div
      className={`w-full h-fit max-h-full rounded-t grid grid-rows-none sm:grid-rows-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-10 px-6 ${
        isAdmin
          ? 'gap-y-5 sm:gap-y-52 2xl:gap-y-36 py-2'
          : 'gap-y-10 sm:gap-y-48 py-6'
      } overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-track-rounded scrollbar-thumb-rounded`}
    >
      {children}
    </div>
  );
};

export default CoursesContentWrapper;
