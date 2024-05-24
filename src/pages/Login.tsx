import { useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Learn from 'assets/svg/Learn';
import bear from 'assets/images/bear.png';
import { t } from 'i18next';
import Logo from 'assets/svg/Logo';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const loginBtn = useRef<HTMLButtonElement>(null);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='relative'>
        <img
          src={bear}
          className='w-[3.5vw] h-auto absolute bottom-[22%] left-[15.5%] skew-x-12 skew-y-6'
          alt='focusBear logo'
        />
        <Logo styles='w-[10vw] h-auto absolute top-1/2 right-[26%] sm:right-[23%] skew-x-3' />
        <Learn />
      </div>
      <button
        ref={loginBtn}
        onClick={() => {
          loginBtn.current!.disabled = true;
          loginWithRedirect();
        }}
        className={`px-10 py-2 rounded-lg font-semibold text-base sm:text-lg text-orange-400 bg-orange-100 hover:bg-orange-400 hover:text-white shadow-md border-2 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-default my-8 2xl:my-14 uppercase`}
      >
        {t('log_in')}
      </button>
    </div>
  );
};

export default Login;
