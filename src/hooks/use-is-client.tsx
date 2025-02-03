'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

const IsClientContext = createContext(false);

export const IsClientCtxProvider = ({
  children,
}: PropsWithChildren<object>) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <IsClientContext.Provider value={isClient}>
      {children}
    </IsClientContext.Provider>
  );
};

export function useIsClient() {
  return useContext(IsClientContext);
}
