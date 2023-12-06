import React, { createContext } from 'react'
import { useUtilities } from '../hooks/utilities'

export const UtilitiesContext = createContext(
  {} as  ReturnType<typeof useUtilities>,
)

interface UtilitiesContextProviderProps {
  children: React.ReactNode
}

export const UtilitiesContextProvider = ({
  children,
}: UtilitiesContextProviderProps) => {
  const { utilities, setOutputSize, setInterval, setTimeSeries } = useUtilities();
  
  return (
    <UtilitiesContext.Provider
      value={{
        utilities,
        setOutputSize,
        setInterval,
        setTimeSeries
      }}
    >
      {children}
    </UtilitiesContext.Provider>
  )
}
