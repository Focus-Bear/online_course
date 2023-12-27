import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='text-8xl font-semibold italic text-blue-200 py-20'>
        Online Course
      </div>
      <div className='flex flex-col justify-center items-center gap-10'>
        <button
          onClick={() => {
            setIsButtonClicked(true);
            loginWithRedirect();
          }}
          disabled={isButtonClicked}
          className={`px-5 py-2 rounded-md text-xl ${
            isButtonClicked
              ? 'bg-gray-100 border-4 border-gray-200 text-gray-300 cursor-default'
              : 'text-orange-400 bg-orange-100 hover:bg-orange-400 hover:text-white login-button'
          }`}
        >
          LOG IN
        </button>
      </div>
    </div>
  );
};

export default Login;
