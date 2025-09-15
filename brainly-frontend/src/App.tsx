import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
import { Card } from './components/Card'

function App() {
  
  return (
    <div>
       <Button startIcon={<PlusIcon size='lg'/>} endIcon={<ShareIcon size='md'/>} size='sm' variant="secondary" text='share' />
       <Button startIcon={<ShareIcon size='lg'/>} endIcon={<ShareIcon size='md'/>} size='sm' variant="primary" text='Add to Content' />
       <Card />
    </div>

  )
}

export default App
