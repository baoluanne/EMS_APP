import { cloneElement } from 'react';
import { FcHome } from 'react-icons/fc';
import { useAppContext } from '@renderer/shared/context/app.context';

export const Tab = ({ tab }) => {
  const appContext = useAppContext();
  const { icon, label } = appContext.context[tab.key] || {};

  return (
    <div className="flex items-center whitespace-nowrap">
      <span className="flex items-center" style={{ flexShrink: 0 }}>
        {cloneElement(icon || <FcHome />, {
          className: 'mr-1',
          fontSize: 'large',
          style: {
            flexShrink: 0,
          },
        })}
      </span>
      <span className="text-xs ml-1 whitespace-nowrap">{label || 'Trang chủ'}</span>
    </div>
  );
};
