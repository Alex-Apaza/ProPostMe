'use client'

import React from 'react'
import Headerp from '@/componentes/Headerp'
import FormVenta from '@/componentes/FormVenta'

const Page = () => {
  return (
    <>
      <Headerp />
      <main className="p-4">
        <FormVenta />
      </main>
    </>
  )
}

export default Page
