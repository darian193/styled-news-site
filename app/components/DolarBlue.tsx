'use client'

import { useEffect, useState } from 'react'

export default function DolarBlue() {
  const [compra, setCompra] = useState('')
  const [venta, setVenta] = useState('')

  useEffect(() => {
    fetch('/api/dolar-blue')
      .then(res => res.json())
      .then(data => {
        setCompra(data.compra)
        setVenta(data.venta)
      })
  }, [])

  return (
    <div className="text-xs text-right ml-auto">
      <span className="text-gray-500">Blue</span>{' '}
      <span className="font-medium text-green-600">Compra: {compra}</span>{' '}
      <span className="font-medium text-red-600">Venta: {venta}</span>
    </div>
  )
}
