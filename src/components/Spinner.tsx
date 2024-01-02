const Spinner = ({
  styles = 'w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 rounded-full border-t-2 border-black animate-spin',
}: {
  styles?: string;
}) => {
  return (
    <div className='w-full min-h-full flex items-center justify-center'>
      <div className={styles}></div>
    </div>
  );
};

export default Spinner;
