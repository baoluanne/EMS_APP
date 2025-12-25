import { Breadcrumbs } from '@mui/material';
import { FcHome } from 'react-icons/fc';
import Link from '@mui/material/Link';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRouteByPath } from '@renderer/routes';

function LinkRouter(props) {
  return <Link {...props} component={RouterLink as any} />;
}

export const AddressBar = () => {
  const location = useLocation();
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    const route = getRouteByPath(location.pathname);
    if (!route) {
      return;
    }
    const segments: any[] = [route];
    let current = route;
    while (current?.parent) {
      segments.push(current.parent);
      current = current.parent;
    }
    setItems(segments.reverse());
  }, [location.pathname]);
  return (
    <div className="bg-white border-gray-300 rounded-md px-4 py-1 overflow-hidden w-full">
      <Breadcrumbs separator="›" aria-label="breadcrumb" className={'min-w-[600px]'}>
        <FcHome />
        {items.map((item) => (
          <LinkRouter
            underline="hover"
            color="inherit"
            to={item.fullPath}
            className={'!text-[13px]'}
          >
            {item.label}
          </LinkRouter>
        ))}
      </Breadcrumbs>
    </div>
  );
};
