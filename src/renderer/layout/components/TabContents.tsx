import { useTabsStore } from '@renderer/shared/stores/tabs.store';
import { TabContextProvider } from '@renderer/layout/utils/tab.context';

export const TabContents = () => {
  const { tabs, activeKey } = useTabsStore();

  return (
    <>
      {tabs.map((tab) => {
        return (
          <div key={tab.key} className={activeKey === tab.key ? 'w-full h-full' : 'hidden'}>
            <TabContextProvider>{tab.content}</TabContextProvider>
          </div>
        );
      })}
    </>
  );
};
