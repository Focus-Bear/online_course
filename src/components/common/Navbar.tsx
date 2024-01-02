import { useAuth0 } from '@auth0/auth0-react';
import { MdLogout, MdOutlineWysiwyg } from 'react-icons/md';
import { useAppDispatch } from 'store';
import { updateNewCourse } from 'store/reducer/course';
import { DEFAULT_NEW_COURSE } from 'assets/data';

const Navbar = () => {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();

  return (
    <div className='absolute -top-10 right-0 flex items-center gap-4'>
      <button
        onClick={() => {
          dispatch(updateNewCourse(DEFAULT_NEW_COURSE));
        }}
        className='flex items-center gap-2 w-fit h-fit text-blue-900 bg-gray-100 hover:bg-gray-300 font-semibold px-4 py-1 rounded'
      >
        New Course
        <MdOutlineWysiwyg />
      </button>
      <button
        onClick={() => {
          logout({
            returnTo: process.env.REACT_APP_AUTH0_LOGOUT_REDIRECT_URI!,
          });
        }}
        className='flex items-center gap-2 w-fit h-fit bg-yellow-300 hover:bg-yellow-400 font-semibold px-4 py-1 text-blue-900 rounded'
      >
        Log Out
        <MdLogout />
      </button>
    </div>
  );
};

export default Navbar;
