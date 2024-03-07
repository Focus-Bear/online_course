import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useAppDispatch, useAppSelector } from 'store';
import { ADMIN_TAB } from 'constants/general';
import { updateCurrentTab } from 'store/reducer/setting';
import ListOfCourses from 'components/admin/ListOfCourses';
import Configuration from 'components/admin/Configuration';
import { useMemo } from 'react';
import { t } from 'i18next';

const getTabContent = (tab: number) => {
  switch (tab) {
    case ADMIN_TAB.CONFIGURATION.tabIndex:
      return <Configuration />;
    default:
      return <ListOfCourses />;
  }
};

const Admin = () => {
  const dispatch = useAppDispatch();
  const { currentTab, currentLanguage } = useAppSelector(
    (state) => state.setting,
  );
  const tabs = useMemo(() => Object.values(ADMIN_TAB), [currentLanguage]);

  return (
    <>
      <Tabs
        selectedIndex={currentTab}
        onSelect={(tabIndex) => {
          dispatch(updateCurrentTab(tabIndex));
        }}
        className='w-full h-full bg-gray-200/50 rounded'
        selectedTabClassName='border-b-4 border-blue-500 bg-gray-100 text-black'
      >
        <TabList className='w-full h-[5%] flex gap-2 bg-gray-600 text-white rounded-t overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 shadow-md'>
          {tabs.map(({ title }) => (
            <Tab
              key={title}
              className='min-w-max w-fit h-full font-bold text-sm px-5 tracking-wide cursor-pointer outline-none flex items-center justify-center'
            >
              {t(title)}
            </Tab>
          ))}
        </TabList>
        {tabs.map(({ tabIndex }) => (
          <TabPanel
            key={tabIndex}
            className={`w-full h-[95%] flex flex-col justify-between items-center ${
              tabIndex !== currentTab && 'hidden'
            } py-4`}
          >
            {getTabContent(tabIndex)}
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
};

export default Admin;
