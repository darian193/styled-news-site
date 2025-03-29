'use client'

import { createContext, useContext, useState } from 'react'

type TileSize = 'small' | 'medium' | 'large'

const TileSizeContext = createContext<{
  size: TileSize
  setSize: (s: TileSize) => void
} | null>(null)

const TileSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = useState<TileSize>('medium')

  return (
    <TileSizeContext.Provider value={{ size, setSize }}>
      {children}
    </TileSizeContext.Provider>
  )
}

export function useTileSize() {
  const context = useContext(TileSizeContext)
  if (!context) throw new Error('useTileSize must be used within a TileSizeProvider')
  return context
}

export default TileSizeProvider
