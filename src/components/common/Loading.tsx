import Logo from 'assets/svg/Logo';
import { t } from 'i18next';

const Loading = () => {
  return (
    <div className='min-h-screen min-w-full flex flex-col gap-10 justify-center items-center'>
      <Logo styles='w-56 sm:w-[40vw] lg:w-[35vw] xl:w-[30vw] h-auto' />
      <h1 className='font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#dd9542] text-center animate-pulse'>
        {t('loading')}
      </h1>
    </div>
  );
};

export default Loading;
