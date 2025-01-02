import React from 'react'
import { useState } from 'react'

const DynamicButtons = () => {

  const [button, setbutton] = useState([])
  const [num, setnum] = useState(6)

  const handleDynamicButtons = (number) => {
    const newbutton = []
    for (let i = 0; i < number; i++) {
      newbutton.push(i)
    }
    setbutton(newbutton)
  }

  return (
    <>
      <button onClick={() => handleDynamicButtons(num)} type="button" className="btn btn-primary" >
          {num}
        </button>
      {button.map((number) => (
        <div className='mt-3'>
          <button key={number}type="button" className="btn btn-primary" >button
          </button>  
        </div>     
      ))}
    </>
  )
}

export default DynamicButtons
