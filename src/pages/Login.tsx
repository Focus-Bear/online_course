import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Learn from 'assets/svg/Learn';
import bear from 'assets/images/bear.png';
import logo from 'assets/images/logo.png';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='relative'>
        <img
          src={bear}
          className='w-[3.5vw] h-auto absolute bottom-[22%] left-[15.5%] skew-x-12 skew-y-6'
        />
        <img
          src={logo}
          className='w-[10vw] h-auto absolute top-1/2 right-[26%] sm:right-[23%] skew-x-3'
        />
        <Learn />
      </div>

      <button
        onClick={() => {
          setIsButtonClicked(true);
          loginWithRedirect();
        }}
        disabled={isButtonClicked}
        className={`px-8 py-2 rounded-md font-semibold text-lg sm:text-xl ${
          isButtonClicked
            ? 'bg-gray-100 border-4 border-gray-200 text-gray-300 cursor-default'
            : 'text-orange-400 bg-orange-100 hover:bg-orange-400 hover:text-white login-button shadow-md'
        } my-10 sm:my-20`}
      >
        LOG IN
      </button>
    </div>
  );
};

export default Login;
