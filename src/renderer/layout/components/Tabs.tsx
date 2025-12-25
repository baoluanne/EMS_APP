import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTabsStore } from '@renderer/shared/stores/tabs.store';
import { useAuthStore } from '@renderer/shared/stores';
import { Tab } from '@renderer/layout/components/Tab';

export const Tabs = () => {
  const { isAuth } = useAuthStore();
  const { tabs, activeKey, setActiveKey, addNewTab, allowCloseTab, closeTab } = useTabsStore();

  if (!isAuth) return null;

  return (
    <div className="flex items-center overflow-x-auto mt-2 ml-2 space-x-1">
      {tabs.map((tab) => {
        return (
          <div
            key={tab.key}
            className={`flex items-center justify-between px-3 h-[32px] min-w-[200px] flex-shrink-0 text-sm cursor-pointer transition no-drag relative
              ${activeKey === tab.key ? 'bg-white text-gray-900 font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-200'}
            `}
            onClick={() => setActiveKey(tab.key)}
            style={{
              borderRadius: '8px 8px 0 0',
              zIndex: activeKey === tab.key ? 10 : 1,
              borderRight: activeKey === tab.key ? 'none' : '1px solid #e0e0e0',
              width: 'auto',
            }}
          >
            <Tab tab={tab} />
            <div className="flex items-center ml-2 flex-shrink-0">
              {allowCloseTab && (
                <button
                  className="p-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.key);
                  }}
                  aria-label="Đóng tab"
                >
                  <CloseIcon
                    className="hover:text-red-500 transition-colors"
                    fontSize="small"
                    sx={{ color: activeKey === tab.key ? '#666666' : '#999999', fontSize: 16 }}
                  />
                </button>
              )}
            </div>
          </div>
        );
      })}

      <Button
        size="small"
        className="hover:bg-gray-300 transition-colors h-[32px] flex items-center justify-center no-drag ml-1"
        sx={{
          minWidth: 32,
          padding: '4px',
          borderRadius: '6px',
          color: '#666666',
        }}
        onClick={addNewTab}
      >
        <Add fontSize="small" sx={{ fontSize: 18 }} />
      </Button>
    </div>
  );
};
