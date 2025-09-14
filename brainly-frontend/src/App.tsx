import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {
  
  return (
    <>
       <Button startIcon={<PlusIcon size='lg'/>} endIcon={<ShareIcon size='md'/>} size='sm' variant="primary" text='share' />
       <Button size='md' variant="secondary" text='share' />
       <Button size='lg' variant="primary" text='share' />
    </>
  )
}

export default App
