import { FcDepartment } from 'react-icons/fc';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const [version, setVersion] = useState('');

  useEffect(() => {
    window.electronAPI.getAppVersion().then((version) => {
      setVersion(version);
    });
  }, []);

  return (
    <div className="w-full flex items-center justify-end px-4 bg-[#e4e4e4] border-gray-300 gap-x-4 h-[32px]">
      <div className="flex items-center">
        <FcDepartment size={20} />
        Trường Đại Học Nam Cần Thơ
      </div>

      <div className="flex items-center">
        <span className="text-xs text-gray-600 font-bold">{version}</span>
      </div>
    </div>
  );
};
