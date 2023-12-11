import { ReactNode } from 'react';

const ModalOverlay = ({
  children,
  styles = 'bg-gray-700 bg-opacity-50',
}: {
  readonly children: ReactNode;
  styles?: string;
}) => (
  <div className={`fixed inset-0 50 h-full w-full z-40 ${styles}`}>
    {children}
  </div>
);

export default ModalOverlay;
