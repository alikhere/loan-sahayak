import { useState } from 'react'
import Form from './Components/Form.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=" flex justify-center">
        <img src="/image2.png" className=" max-w-80" />
      </div>
      <Form/>
      
    </>
  )
}

export default App
