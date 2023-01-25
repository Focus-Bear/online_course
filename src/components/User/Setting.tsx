const Setting = () => {
  return (
    <div className='w-full h-full bg-gray-200/50 rounded flex p-6 gap-4'>
      <div className='w-1/2 h-full flex flex-col bg-gray-100/70 rounded py-2 px-4'>
        <div className='w-full flex items-center text-sm gap-2'>
          <div className='font-bold tracking-wide'>Language</div>
          <select
            className='w-1/5 h-fit cursor-pointer font-semibold border border-gray-200 rounded outline-none p-0.5'
            defaultValue='en'
          >
            <option className='text-sm py-0.5 font-semibold' value='en'>
              English
            </option>
            <option className='text-sm py-0.5 font-semibold' value='es'>
              Espanol
            </option>
          </select>
        </div>
      </div>
      <div className='w-1/2 h-full flex flex-col bg-gray-100/70 rounded py-2 px-4'></div>
    </div>
  );
};

export default Setting;
