import React from 'react'

const sem = (props) => {
  return (
    <div className='border border-emerald-800 p-2 mt-2 mb-2 bg-white text-sm text-nowrap hover:scale-110 hover:shadow-[2px_2px_0px_0px_#065f46] shadow-[4px_5px_0px_0px_#065f46]'>Sem - {props.s}
    </div>
  )
}

export default sem
