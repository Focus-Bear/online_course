const Spinner = ({
  styles = 'w-8 h-8 rounded-full border-t-2 border-white animate-spin',
}: {
  styles?: string;
}) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className={styles}></div>
    </div>
  );
};

export default Spinner;
