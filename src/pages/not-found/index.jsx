import React from 'react'
import { useNavigate } from 'react-router-dom'

const index = () => {
  const navigate = useNavigate()
  return (
    <div className='not-found'>
      <div className="not-found-box">
        <h1>404</h1>
        <h4>Xatolik</h4>
        <h6>Bu sahifa topilmadi...!</h6>
        <button className="back-page" onClick={() => navigate("/")}>
          Ortga qaytish
        </button>
      </div>
    </div>
  )
}

export default index