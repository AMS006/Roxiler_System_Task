import React from 'react'
import ReactLoding from 'react-loading'

const Loading = () => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <ReactLoding type='spin' height={65} width={35} color='blue' />
    </div>
  )
}

export default Loading
