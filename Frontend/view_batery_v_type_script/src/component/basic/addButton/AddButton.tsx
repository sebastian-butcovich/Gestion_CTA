import React from 'react'
import "./addButton.scss"
type Props = {
    onClick: ()=>void;
}
function AddButton({onClick}:Props) {
  return (
   <button className='fab-button' onClick={onClick}>+</button>
  )
}

export default AddButton