import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
      <div className='text-4xl font-semibold'>404</div>
      <Link
        className='bg-blue-500 hover:bg-blue-600 font-semibold text-white px-4 py-1 rounded'
        to='/'
      >
        Home
      </Link>
    </div>
  );
};

export default NotFound;
