'use client';

import React, { ReactNode, useContext, useState } from 'react';

interface State {
  openSearch: boolean;
}

const UIContext = React.createContext<State | any>(false);

export const UIProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const value = {
    isOpenSearch,
    setIsOpenSearch,
  };

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context == undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
};
