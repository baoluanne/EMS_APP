const routeMap = new Map();

export const getRouteByPath = (route: string) => {
  return routeMap.get(route);
};

export const generateFullPath = (routes, parent?: { fullPath: string }) => {
  return routes.map((route) => {
    const parentFullPath = parent?.fullPath || '/';
    route.fullPath = `${parentFullPath}/${route.path}`.replace(/\/+/g, '/');
    route.parent = parent;
    if (route.children?.length) {
      route.children = generateFullPath(route.children, route);
    }
    routeMap.set(route.fullPath, route);
    return route;
  });
};
