import React, { useState } from 'react';
import ISearch from '../icons/search';

interface Props {}

export const SearchButton: React.FC<Props> = ({}) => {
  const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);
  return (
    <span
      className="search-icon cursor-pointer"
      onClick={(e) => {
        setOpenSearchBar(!openSearchBar);
      }}
    >
      <ISearch className="search-icon" />
    </span>
  );
};
