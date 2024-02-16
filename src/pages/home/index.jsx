import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/appContext'
import { useLogoutUserMutation } from '../../services/appApi'

const index = () => {

  const user = useSelector(state => state.user)
  const [data, setData] = useState([])
  const { socket } = useContext(AppContext)
  const messageEndRef = useRef(null)
  const [logoutUser, { isLoading, error }] = useLogoutUserMutation()

  const handleLogout = async () => {
    await logoutUser(user)
    // window.location.replace('/');
  }

  socket.emit('get_data');
  socket.on('send_data', (data) => {
    setData(data)
  });

  useEffect(() => {
    scrollToBottom()
  }, [data.length])

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className='home'>
      <div className='profil_text'>
        {
          data?.map(item => {
            if (item.type === "matn") {
              return (
                <div key={item._id} className="profil_text_item">
                  <div className="profil_text_item_info">
                    <div className="profil_text_item_info_img">
                      <img src={item.from.picture} alt="" />
                    </div>
                    <div className="profil_text_item_info_info">
                      <h4>{item.from.fullname}</h4>
                    </div>
                  </div>
                  <hr />
                  <p className='profil_text_item_text'>{item.content}</p>
                </div>
              )
            }
            else {
              return (
                <div key={item._id} className="profil_text_item">
                  <div className="profil_text_item_info">
                    <div className="profil_text_item_info_img">
                      <img src={item.from.picture} alt="" />
                    </div>
                    <div className="profil_text_item_info_info">
                      <h4>{item.from.fullname}</h4>
                    </div>
                  </div>
                  <hr />
                  <img src={item.content} alt="" className='profil_text_item_text' />
                </div>
              )
            }
          })
        }
        <div ref={messageEndRef} />
      </div>
    </div >
  )
}

export default index