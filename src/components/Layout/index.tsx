import { ReactNode } from 'react';

const Layout = ({ children }: { readonly children: ReactNode }) => {
  return (
    <div className='w-5/6 h-3/4 flex flex-col items-center relative'>
      {children}
    </div>
  );
};

export default Layout;
