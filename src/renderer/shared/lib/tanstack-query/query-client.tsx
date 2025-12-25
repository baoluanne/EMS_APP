import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

interface Props {
  children?: React.ReactNode;
}

export const QueryClientProvider: React.FC<Props> = ({ children }) => {
  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
};
