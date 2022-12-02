import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Courses from './Courses';
import Permissions from './Permissions';
import Users from './Users';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full h-full flex flex-col items-center relative pt-10'>
      <div className='absolute top-0 right-0 flex items-center gap-4'>
        <button
          onClick={() => {
            navigate('/', { replace: true });
          }}
          className='flex items-center gap-2 w-fit h-fit bg-yellow-300 hover:bg-yellow-400 font-semibold px-4 py-1 text-blue-900 rounded'
        >
          Log Out
          <MdLogout />
        </button>
      </div>
      <Tabs className='w-full h-full bg-gray-200/50 rounded'>
        <TabList className='flex gap-2 bg-gray-400 border-b-2 border-gray-100 rounded-t'>
          <Tab className='w-fit text-center font-bold text-sm px-5 py-2 tracking-wide cursor-pointer'>
            Courses
          </Tab>
          <Tab className='w-fit text-center font-bold text-sm px-5 py-2 tracking-wide cursor-pointer'>
            Users
          </Tab>
          <Tab className='w-fit text-center font-bold text-sm px-5 py-2 tracking-wide cursor-pointer'>
            Permissiones
          </Tab>
        </TabList>
        <TabPanel className='w-full h-full p-4'>
          <Courses />
        </TabPanel>
        <TabPanel className='w-full h-full p-4'>
          <Users />
        </TabPanel>
        <TabPanel className='w-full h-full p-4'>
          <Permissions />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Admin;
