import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='text-6xl  font-semibold italic text-blue-200 py-20'>
        Online Course ABC
      </div>
      <div className='flex flex-col justify-center items-center gap-10'>
        <button
          onClick={() => loginWithRedirect()}
          className='w-fit h-fit px-6 py-1 font-semibold cursor-pointer bg-blue-800 hover:bg-blue-700 text-white text-lg rounded-md'
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
