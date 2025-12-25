import { Button } from '@mui/material';
import { useSidebarStore } from '@renderer/shared/stores';
import { IconLayoutSidebarLeftExpand, IconLayoutSidebarRightExpand } from '@tabler/icons-react';
import { FcNext, FcPrevious, FcRefresh } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useHandleRefresh } from '@renderer/layout/utils/tab.context';

const defaultButtonStyle = { minWidth: 32, padding: '4px', borderRadius: '6px' };

export const NavigationButtons = () => {
  const navigate = useNavigate();
  const { isOpen, toggle } = useSidebarStore();
  const handleRefresh = useHandleRefresh();

  return (
    <div className="flex gap-1 items-center px-2">
      <Button
        className="hover:bg-gray-300 transition-colors"
        sx={defaultButtonStyle}
        onClick={() => navigate(-1)}
      >
        <FcPrevious style={{ fontSize: '14px' }} />
      </Button>
      <Button
        className="hover:bg-gray-300 transition-colors"
        sx={defaultButtonStyle}
        onClick={() => navigate(1)}
      >
        <FcNext style={{ fontSize: '14px' }} />
      </Button>
      <Button
        className="hover:bg-gray-300 transition-colors"
        sx={defaultButtonStyle}
        onClick={toggle}
      >
        {isOpen ? (
          <IconLayoutSidebarRightExpand size={19} />
        ) : (
          <IconLayoutSidebarLeftExpand size={19} />
        )}
      </Button>
      <Button
        className="hover:bg-gray-300 transition-colors"
        sx={defaultButtonStyle}
        onClick={handleRefresh}
      >
        <FcRefresh style={{ fontSize: '14px' }} />
      </Button>
    </div>
  );
};
