import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext, socket } from '../../context/appContext'
import IconX from '/src/assets/images/png/xicon.png'
import { useNavigate } from 'react-router-dom'
import { addNotifications, resetNotifications } from '/src/features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Badge } from 'antd'
import IconSaved from '/src/assets/images/png/saved.png'

const index = () => {

  const { socket, setMembers, setPrivateMemberMsg, setCurrentRoom, currentRoom, members } = useContext(AppContext)

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload)
  });

  // const getMembers = async () => {
  //   const data = await axios.get("http://localhost:5001/users/users")
  //   setMembers(data?.data)
  // }

  // useEffect(() => {
  //   getMembers()
  // }, [])

  socket.emit('get_user_all');
  socket.on('send_user_all', (data) => {
    setMembers(data)
  });

  const [value, setValue] = useState("")
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
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

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2
    }
    else {
      return id2 + "-" + id1
    }
  }

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member)
    const roomId = orderIds(user._id, member._id)
    joinRoom(roomId, false)
    navigate("/message")
  }
  return (
    <div className='chat'>
      <label htmlFor="chat" className='chat-label'>
        <input placeholder='Search...' value={value} className='chat-label-input' type="text" id='chat' onChange={(e) => setValue(e.target.value)} />
        <button className='chat-label-x' onClick={() => setValue("")}>
          <img src={IconX} className="chat-label-x-img" alt="" />
        </button>
      </label>
      <div className="chat-result">
        <h5 className="chat-result-title">Chats</h5>
        <hr />
      </div>
      <div className="chat-box">
        <div className="chat-box-inbox">
          <div div className="chat-box-inbox-item" onClick={() => handlePrivateMemberMsg(user)}>
            <div className="chat-box-inbox-item-img">
              <img src={IconSaved} alt="" />
            </div>
            <h3 className='chat-box-inbox-item-username'>Saved Messages</h3>
          </div >
          {members &&
            members.filter(item => item._id != user._id).filter(member => member.fullname.toLowerCase().includes(value.toLowerCase())).map(member => {
              return (
                <div div key={member?.id} className="chat-box-inbox-item" onClick={() => handlePrivateMemberMsg(member)}>
                  <div className="chat-box-inbox-item-img">
                    <img src={member?.picture} alt="" />
                    <span className={`${member.status === "Online" ? 'online' : "offline"}`}></span>
                  </div>
                  <h3 className='chat-box-inbox-item-username'>{member?.fullname}</h3>
                  <Badge count={currentRoom !== member && user.newMessages[orderIds(member?._id, user?._id)]}></Badge>
                </div >
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default index