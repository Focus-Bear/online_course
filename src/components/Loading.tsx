import logo from '../assets/images/logo.png';

const Loading = () => {
  return (
    <div className='min-h-screen min-w-full flex justify-center items-center'>
      <div>
        <img src={logo} alt='logo' />
        <h1 className='font-semibold text-4xl mt-[100px] text-[#dd9542] text-center'>
          Loading
        </h1>
      </div>
    </div>
  );
};

export default Loading;
