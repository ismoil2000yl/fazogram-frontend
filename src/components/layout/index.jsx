import React from 'react'
import Footer from './footer'
import Content from './content'

const index = () => {
  return (
    <div className='layout'>
      <div className="layout-box">
        <div className="layout-box-content">
          <Content />
        </div>
        <div className="layout-box-footer">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default index