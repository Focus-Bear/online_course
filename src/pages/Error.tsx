import { updateError } from 'store/reducer/error';
import { useAppDispatch } from 'store';
import { useAuth0 } from '@auth0/auth0-react';
import { t } from 'i18next';

const ErrorPage = () => {
  const dispatch = useAppDispatch();
  const { logout } = useAuth0();

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-fit h-fit flex flex-col gap-4 items-center justify-center bg-gray-200 rounded-lg px-16 py-10'>
        <p className='text-xl font-bold'>
          {t('error.couldnt_process_the_request')}
        </p>
        <button
          onClick={() => {
            dispatch(updateError({ value: false, message: '' }));
            logout({
              returnTo: process.env.REACT_APP_AUTH0_LOGOUT_REDIRECT_URI!,
            });
          }}
          className='buttonDark capitalize py-2 font-semibold'
        >
          {t('back_to_home')}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
