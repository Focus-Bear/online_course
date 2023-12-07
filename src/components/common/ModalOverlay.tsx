import { ReactNode } from 'react';

const ModalOverlay = ({ children }: { readonly children: ReactNode }) => (
  <div className='fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-50'>
    {children}
  </div>
);

export default ModalOverlay;
