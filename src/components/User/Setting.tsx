import { MdOutlineDeveloperBoard } from 'react-icons/md';

const Setting = () => {
  return (
    <div className='w-full h-full bg-gray-200/50 rounded flex flex-col items-center justify-center'>
      <MdOutlineDeveloperBoard className='text-6xl text-white' />
      <div className='text-4xl text-white'>Dev-mode</div>
    </div>
  );
};

export default Setting;
