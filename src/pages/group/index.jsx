import IconGroupChat from '/src/assets/images/png/group-chat.png'
import IconDot from '/src/assets/images/png/dot.png'
import Message from './message'
import { useLocation, useNavigate } from 'react-router-dom'
import { Badge } from 'antd';
import { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotifications, resetNotifications } from '/src/features/userSlice'
import { AppContext } from '../../context/appContext'

const group = () => {

  const navigate = useNavigate()

  const location = useLocation()

  const user = useSelector((state) => state.user)
  const { socket, setCurrentRoom, rooms, setRooms, currentRoom, setPrivateMemberMsg } = useContext(AppContext)

  const dispatch = useDispatch()

  const joinRoom = (room, isPublic = true) => {
    socket.emit("join-room", room)
    setCurrentRoom(room)

    if (isPublic) {
      setPrivateMemberMsg(null)
    }

    dispatch(resetNotifications(room))

  }

  socket.off('notifications').on('notifications', (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room))
  })

  useEffect(() => {
    if (user) {
      // setCurrentRoom("general")
      // socket.emit("join-room", "general")
      socket.emit("new-user")
    }
    if (location.pathname == "/group") {
      joinRoom("fazogram-chats")
    }
  }, [])

  return (
    <div className='message'>
      <div className="message-header">
        <div className="message-header-box">
          <div className="message-header-box-left">
            <div className="message-header-box-left-box user">
              <div className="user-img">
                <img src={IconGroupChat} alt="" />
              </div>
              <div className="user-title">
                <h3 className="user-title-name">Fazogram chat</h3>
                <h5 className='user-title-online'>online
                  <span className='user-title-online-span online'></span>
                </h5>
              </div>
            </div>
          </div>
          <div className="message-header-box-right">
            <button className='message-header-box-right-btn'>
              <img src={IconDot} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="message-box">
        <Message />
      </div>
    </div>
  )
}

export default group