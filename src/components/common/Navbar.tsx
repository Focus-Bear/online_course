import { useAuth0 } from '@auth0/auth0-react';
import { MdLogout, MdOutlineWysiwyg } from 'react-icons/md';
import { useAppDispatch } from 'store';
import { updateNewCourse } from 'store/reducer/course';
import { DEFAULT_NEW_COURSE } from 'assets/default';
import LanguageSelector from 'components/common/LanguageSelector';
import { t } from 'i18next';
import AuthButton from './buttons/AuthButton';
import { useRef } from 'react';

const Navbar = () => {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();
  const logOutBtn = useRef<HTMLButtonElement>(null);

  return (
    <div className='absolute -top-10 right-0 flex items-start gap-4'>
      <AuthButton
        label={t('course.new_course')}
        icon={<MdOutlineWysiwyg />}
        onClick={() => dispatch(updateNewCourse(DEFAULT_NEW_COURSE))}
      />
      <AuthButton
        ref={logOutBtn}
        label={t('log_out')}
        icon={<MdLogout />}
        onClick={() => {
          logOutBtn.current!.disabled = true;
          logout({
            returnTo: process.env.REACT_APP_AUTH0_LOGOUT_REDIRECT_URI!,
          });
        }}
        styles={
          'bg-orange-300 hover:bg-orange-400 text-blue-900 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200'
        }
      />

      <LanguageSelector />
    </div>
  );
};

export default Navbar;
