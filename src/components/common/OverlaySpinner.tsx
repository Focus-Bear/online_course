import { t } from 'i18next';
import ModalOverlay from './ModalOverlay';
import { AiOutlineLoading } from 'react-icons/ai';

const OverlaySpinner = ({ title }: { title?: string }) => (
  <ModalOverlay styles='bg-gray-700 bg-opacity-70'>
    <div className='w-fit h-full flex items-center gap-3 mx-auto pt-5'>
      <AiOutlineLoading className='animate-spin' />
      <div className='text-xs md:text-base font-semibold'>
        {title ?? t('updating')}
      </div>
    </div>
    <span className='sr-only'>{title ?? t('updating')}</span>
  </ModalOverlay>
);

export default OverlaySpinner;
