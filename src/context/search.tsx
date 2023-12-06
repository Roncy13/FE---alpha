import React, { createContext } from 'react'
import { useSearch } from '../hooks/search'

export const SearchContext = createContext(
  {} as  ReturnType<typeof useSearch>,
)

interface SearchContextProviderProps {
  children: React.ReactNode
}

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const { search, setSearch, data } = useSearch();
  
  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        data
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
