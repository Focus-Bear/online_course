import logo from 'assets/images/logo.png';
import { t } from 'i18next';

const Loading = () => {
  return (
    <div className='min-h-screen min-w-full flex justify-center items-center'>
      <div>
        <img
          src={logo}
          alt='logo'
          className='w-[30vw] h-auto object-cover'
        />
        <h1 className='font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl mt-10 sm:mt-16 md:mt-20 text-[#dd9542] text-center animate-pulse'>
          {t('loading')}
        </h1>
      </div>
    </div>
  );
};

export default Loading;
