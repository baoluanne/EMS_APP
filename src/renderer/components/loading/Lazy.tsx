import React, { ComponentType, LazyExoticComponent, Suspense } from 'react';
import { LoadingScreen } from './LoadingScreen';

export const Lazy = <T extends object = {}>(
  Component: LazyExoticComponent<ComponentType<T>>,
): React.FC<T> => {
  // eslint-disable-next-line react/display-name
  return (props: T) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};
