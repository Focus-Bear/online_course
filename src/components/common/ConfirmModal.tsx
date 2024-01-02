import ModalOverlay from './ModalOverlay';
import ModalContentWrapper from './ModalContentWrapper';
import { MODAL_TYPE } from 'constants/general';
import { useAppDispatch, useAppSelector } from 'store';
import { updateConfirmModal } from 'store/reducer/setting';
import { DEFAULT_CONFIRM_MODAL } from 'assets/data';

const ConfirmModal = () => {
  const dispatch = useAppDispatch();
  const {
    confirmModal: { content, onConfirm },
  } = useAppSelector((state) => state.setting);

  return (
    <ModalOverlay>
      <ModalContentWrapper modal={MODAL_TYPE.CONFIRM}>
        <div className='w-full min-h-[15vh] h-fit flex flex-col items-center justify-around gap-2'>
          <p className='text-sm sm:text-base md:text-lg font-semibold text-center'>
            {content}
          </p>
          <div className='flex items-center justify-center gap-4'>
            <button
              onClick={() =>
                dispatch(updateConfirmModal(DEFAULT_CONFIRM_MODAL))
              }
              className='w-fit h-fit px-2 sm:px-3 md:x-4 py-1 sm:py-1.5 md:y-2 bg-gray-600 text-white rounded-md font-semibold text-sm md:text-base'
            >
              Cancel
            </button>
            {onConfirm ? (
              <button
                onClick={() => onConfirm?.()}
                className='w-fit h-fit px-2 sm:px-3 md:x-4 py-1 sm:py-1.5 md:y-2 bg-green-600 text-white rounded-md font-semibold text-sm md:text-base'
              >
                Confirm
              </button>
            ) : null}
          </div>
        </div>
      </ModalContentWrapper>
    </ModalOverlay>
  );
};

export default ConfirmModal;
