import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { updateUserDetails } from '../store/reducer/user';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='text-6xl  font-semibold italic text-blue-200 py-20'>
        Online Course ABC
      </div>
      <div className='flex items-center gap-10'>
        <button
          onClick={() => {
            navigate('/dashboard');
            dispatch(
              updateUserDetails({
                fullname: 'John Wick',
                email: 'john234@gmail.com',
              })
            );
          }}
          className='w-fit h-fit px-6 py-1 font-semibold cursor-pointer bg-blue-800 hover:bg-blue-700 text-white text-lg rounded-md'
        >
          Log In
        </button>
        <button
          onClick={() => {
            navigate('/admin');
            dispatch(
              updateUserDetails({
                fullname: 'Samuel Jackson',
                email: 'samjack8546@gmail.com',
              })
            );
          }}
          className='w-fit h-fit px-6 py-1 font-semibold cursor-pointer bg-blue-800 hover:bg-blue-700 text-white text-lg rounded-md'
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Login;
