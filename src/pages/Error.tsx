import { updateError } from 'store/reducer/error';
import { useAppDispatch } from 'store';
import { useAuth0 } from '@auth0/auth0-react';
import { t } from 'i18next';

const ErrorPage = () => {
  const dispatch = useAppDispatch();
  const { logout } = useAuth0();

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-fit h-fit flex flex-col gap-4 items-center justify-center bg-gray-200 rounded-lg p-4'>
        <div className='text-xl font-bold'>
          {t('error.oops_something_went_wrong')}
        </div>
        <button
          onClick={() => {
            dispatch(updateError({ value: false, message: '' }));
            logout({
              returnTo: process.env.REACT_APP_AUTH0_LOGOUT_REDIRECT_URI!,
            });
          }}
          className='buttonDark'
        >
          {t('back_to_home')}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
