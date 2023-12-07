import { ReactNode } from 'react';

const ModalContentWrapper = ({
  children,
  styles = 'bg-white text-black',
}: {
  readonly children: ReactNode;
  styles?: string;
}) => (
  <div
    className={`relative w-5/6 xs:w-4/5 sm:w-3/4 md:w-3/5 lg:w-1/2 2xl:w-2/5 h-fit flex flex-col rounded-md p-6 mx-auto top-1/4 -translate-y-1/4 ${styles}`}
  >
    {children}
  </div>
);

export default ModalContentWrapper;
