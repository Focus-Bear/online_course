import { MdHourglassEmpty } from 'react-icons/md';

const EmptyItems = ({
  message = "You've not created any course yet.",
}: {
  message?: string;
}) => {
  return (
    <div className='w-full h-full text-2xl font-semibold flex items-center justify-center gap-2'>
      <MdHourglassEmpty />
      <p>{message}</p>
    </div>
  );
};

export default EmptyItems;
