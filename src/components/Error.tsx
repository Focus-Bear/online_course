import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { updateError } from '../store/reducer/error';
import { ROUTES } from '../utils/constants';

const ErrorPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-fit h-fit  flex flex-col items-center justify-center bg-gray-200 rounded-lg p-4'>
        <div className='text-2xl font-bold'>ERROR</div>
        <button
          onClick={() => {
            dispatch(updateError({ value: false, message: '' }));
            navigate(ROUTES.HOME);
          }}
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
