import { Button, Popconfirm } from 'antd';
import { useSelector } from 'react-redux'
import { MailOutlined, VideoCameraOutlined, PhoneOutlined, PlusOutlined, FormOutlined, LogoutOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useLogoutUserMutation } from '../../services/appApi';
import IconImg from '/src/assets/images/png/accaunt.png'
import axios from 'axios'
import React, { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/appContext'

const profil = () => {

  const { user } = useSelector(state => state)
  const [logoutUser, { isLoading, error }] = useLogoutUserMutation()
  const [activeBtn, setActiveBtn] = useState("matn")

  const handleLogout = async () => {
    await logoutUser(user)
    // window.location.replace('/');
  }
  console.log(user);

  const confirm = (e) => {
    handleLogout()

  };
  const cancel = (e) => {
    console.log(e);
  };

  const [data, setData] = useState([])
  const { socket } = useContext(AppContext)

  socket.emit('get_data');
  socket.on('send_data', (data) => {
    setData(data)
  });

  return (
    <div className='profil'>
      <div className="profil_info">
        <div className="profil_info_img">
          <img className="profil_info_img_item" src={user.picture} alt="" />
        </div>
        <div className="profil_info_info">
          <h3>{user.username}</h3>
          <h2>{user.fullname}</h2>
          <div className="profil_info_info_info">
            <h5>Matnli postlari: {data?.filter(item => item.from._id == user._id).filter(item => item.type === "matn").length}</h5>
            <h5>Rasmli postlari: {data?.filter(item => item.from._id == user._id).filter(item => item.type === "rasm").length}</h5>
          </div>
          <div className="profil_info_info_box">
            <Button type='primary'><FormOutlined />Profilni tahrirlash</Button>
            <Popconfirm
              title="Profildan chiqish"
              description="Profildan chiqishni xoxlaysizmi?"
              onConfirm={() => { confirm, localStorage.removeItem("persist:root"), location.reload('/') }}
              onCancel={cancel}
              okText="Ha"
              cancelText="Yo'q"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: 'red',
                  }}
                />
              }
            >
              <Button type='primary' danger><LogoutOutlined />Profildan chiqish</Button>
            </Popconfirm>
          </div>
        </div>
      </div>
      <div className="profil_post">
        <div className="profil_post_btn">
          <Button onClick={() => setActiveBtn("matn")} type={activeBtn === "matn" && 'link'}>Matnli postlar</Button>
          <Button onClick={() => setActiveBtn("rasm")} type={activeBtn === "rasm" && 'link'}>Rasmli postlar</Button>
        </div>
        <hr />
      </div>
      {
        activeBtn === "rasm" ?
          <div className="profil_box">
            {
              data?.filter(item => item.from._id == user._id).map(item => {
                if (item.type === "rasm") {
                  return (
                    <div key={item._id} className="profil_box_item">
                      <img className="profil_box_item_img" src={item.content} alt="" />
                    </div>
                  )
                }
              })
            }
          </div> :
          <div className='profil_text'>
            {
              data?.filter(item => item.from._id == user._id).map(item => {
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
              })
            }
          </div>
      }
    </div>
  )
}

export default profil