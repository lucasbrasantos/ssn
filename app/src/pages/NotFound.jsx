import React from 'react'
import '../styles/pages/_notFound.scss'

const NotFound = () => {
  return (
    <div className='notFound'>
        <div className='ball'>
            <p className='error1'>404</p>
            <p className='error'>error</p>
            <p className='text'>pagina não encontrada</p>
        </div>
        <a href="/">retornar</a>
    </div>
  )
}

export default NotFound