import { Button, Popconfirm } from 'antd';
import { useSelector } from 'react-redux'
import { MailOutlined, VideoCameraOutlined, PhoneOutlined, PlusOutlined, FormOutlined, LogoutOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useLogoutUserMutation } from '../../services/appApi';
import IconImg from '/src/assets/images/png/accaunt.png'
import axios from 'axios'
import React, { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../context/appContext'
import IconGalochka from '/src/assets/images/png/galochka.png'

const profil = () => {

    const { user } = useSelector(state => state)
    const [activeBtn, setActiveBtn] = useState("matn")
    const { id } = useParams()

    const [data, setData] = useState([])
    const [userData, setUserData] = useState({})
    const { socket } = useContext(AppContext)

    socket.emit('get_data');
    socket.on('send_data', (data) => {
        setData(data)
    });

    socket.emit('get_user', id);
    socket.on('send_user', (data) => {
        setUserData(data)
    });

    return (
        <div className='profil'>
            <div className="profil_info">
                <div className="profil_info_img">
                    <img className="profil_info_img_item" src={userData.picture} alt="" />
                </div>
                <div className="profil_info_info">
                    <h3>{userData.username}</h3>
                    <h2 className='galochka_div'>{userData.fullname} {userData.username === "ismoil2000yl" && <img src={IconGalochka} className={"galochka"} alt="" />}</h2>
                    <div className="profil_info_info_info">
                        <h5>Matnli postlari: {data?.filter(item => item.from._id == userData._id).filter(item => item.type === "matn").length}</h5>
                        <h5>Rasmli postlari: {data?.filter(item => item.from._id == userData._id).filter(item => item.type === "rasm").length}</h5>
                    </div>
                </div>
            </div>
            <div className="profil_btn">
                <Button><PhoneOutlined className='rotate-90' />Audio qo'ng'iroq</Button>
                <Button><VideoCameraOutlined />Video qo'ng'iroq</Button>
                <Button><MailOutlined />Xabar yuborish</Button>
            </div>
            <div className="profil_post">
                <div className="profil_post_btn">
                    <Button onClick={() => setActiveBtn("matn")} type={activeBtn === "matn" && 'primary'}>Matnli postlar</Button>
                    <Button onClick={() => setActiveBtn("rasm")} type={activeBtn === "rasm" && 'primary'}>Rasmli postlar</Button>
                </div>
                <hr />
            </div>
            {
                activeBtn === "rasm" ?
                    <div className="profil_box">
                        {
                            data?.filter(item => item.from._id == userData._id).map(item => {
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
                            data?.filter(item => item.from._id == userData._id).map(item => {
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