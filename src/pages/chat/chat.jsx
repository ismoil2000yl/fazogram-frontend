import React, { useContext } from 'react'
import IconBack from '/src/assets/images/png/back.png'
import IconUser from '/src/assets/images/png/image.jpg'
import IconDot from '/src/assets/images/png/dot.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import MessageBox from './message'
import { AppContext } from '../../context/appContext'
import { Modal } from 'antd'


const index = () => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const { privateMemberMsg } = useContext(AppContext)

    return (
        <div className='message'>
            <div className="message-header">
                <div className="message-header-box">
                    <div className="message-header-box-left">
                        <button onClick={() => navigate(-1)} className="message-header-box-left-btn">
                            <img src={IconBack} alt="" />
                        </button>
                        <div className="message-header-box-left-box user">
                            <div className="user-img" onClick={() => setIsOpen(true)}>
                                <img src={privateMemberMsg?.picture} alt="" />
                            </div>
                            <div className="user-title">
                                <h3 className="user-title-name">{privateMemberMsg?.username}</h3>
                                <h5 className={`user-title-${privateMemberMsg?.status === "Online" ? "online" : "offline"}`}>{privateMemberMsg?.status}
                                    <span className={`user-title-${privateMemberMsg?.status === "Online" ? "online" : "offline"}-span ${privateMemberMsg?.status === "Online" ? "online" : "offline"}`}></span>
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
                <MessageBox />
            </div>
            <Modal
                open={isOpen}
                footer={false}
                onCancel={() => setIsOpen(false)}
                // className={"message-modal"}
            >
                <div onClick={() => setIsOpen(false)} className='message-seen'>
                    <img src={privateMemberMsg?.picture} alt="" />
                </div>
            </Modal>
        </div>
    )
}

export default index