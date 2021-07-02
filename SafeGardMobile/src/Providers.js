import React from 'react'
import { AunthProvider } from './AuthProvider'
import Routes from './Routes'

export default function Providers(props) {
  return (
    <AunthProvider>
      <Routes />
    </AunthProvider>)
}