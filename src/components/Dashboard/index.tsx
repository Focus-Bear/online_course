import Header from '../Header';
import TrendingCourse from './TrendingCourse';

const Dashboard = () => {
  return (
    <div className='w-full h-full flex flex-col items-center py-16'>
      <Header />
      <div className='w-5/6 h-full flex gap-8'>
        <div className='w-3/4 h-5/6 rounded bg-gray-200'></div>
        <TrendingCourse />
      </div>
    </div>
  );
};

export default Dashboard;
