import Tooltip from '@mui/material/Tooltip';
import { Fragment } from 'react';
import { useSidebarStore } from '@renderer/shared/stores';

export const FolderMenu = ({ menuItems, onMenuClick }) => {
  const { isOpen } = useSidebarStore();
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${isOpen ? 'lg:grid-cols-6' : 'lg:grid-cols-7'} gap-4 p-4 w-full`}
    >
      {menuItems.map((item, idx) => (
        <Fragment key={idx}>
          <Tooltip title={item.label} arrow disableHoverListener={item.disabled}>
            <div
              onClick={() => onMenuClick(item)}
              className={`${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100 cursor-pointer'} flex flex-col items-center justify-center p-3 rounded-lg  transition-colors duration-200 ${item.className || ''}`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div
                className="text-center text-gray-800 font-medium truncate w-full"
                style={{ fontSize: 12 }}
              >
                {item.label}
              </div>
            </div>
          </Tooltip>
          {item.hasDivider && (
            <div style={{ gridColumn: '1 / -1' }} className="border-b border-blue-200 my-1"></div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
