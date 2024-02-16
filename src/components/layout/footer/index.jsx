import IconHome from '/src/assets/images/png/home.png'
import IconMessage from '/src/assets/images/png/message.png'
import IconGroup from '/src/assets/images/png/group.png'
import IconSearch from '/src/assets/images/png/search.png'
import IconAccaunt from '/src/assets/images/png/accaunt.png'
import IconPlus from '/src/assets/images/png/add-picture.png'
import IconText from '/src/assets/images/png/add-text.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { Badge } from 'antd';
import { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotifications, resetNotifications } from '/src/features/userSlice'
import { AppContext } from '../../../context/appContext'

const footer = () => {
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
        if ("fazogram-chats" != room) dispatch(addNotifications(room))
    })

    useEffect(() => {
        if (user) {
            // setCurrentRoom("general")
            // socket.emit("join-room", "general")
            socket.emit("new-user")
        }
    }, [])

    return (
        <div className='footer'>
            <button
                className={`footer-btn ${location.pathname === "/" ? "active" : ""}`}
                onClick={() => navigate("/")}>
                <img className='footer-btn-img' src={IconHome} alt="" />
            </button>
            <button
                className={`footer-btn ${location.pathname === "/chat" ? "active" : ""}`}
                onClick={() => navigate("/chat")}>
                <img className='footer-btn-img' src={IconMessage} alt="" />
            </button>
            <Badge shape="square" color={"green"} count={"fazogram-chats" != "fazogram-chats" && user.newMessages["fazogram-chats"]}>
                <button
                    className={`footer-btn ${location.pathname === "/group" ? "active" : ""}`}
                    onClick={() => navigate("/group")}>
                    <img className='footer-btn-img' src={IconGroup} alt="" />
                </button>
            </Badge>
            <button
                className={`footer-btn ${location.pathname === "/add-picture" ? "active" : ""}`}
                onClick={() => navigate("/add-picture")}>
                <img className='footer-btn-img' src={IconPlus} alt="" />
            </button>
            <button
                className={`footer-btn ${location.pathname === "/add-text" ? "active" : ""}`}
                onClick={() => navigate("/add-text")}>
                <img className='footer-btn-img' src={IconText} alt="" />
            </button>
            <button
                className={`footer-btn ${location.pathname === "/search" ? "active" : ""}`
                } onClick={() => navigate("/search")}>
                <img className='footer-btn-img' src={IconSearch} alt="" />
            </button>
            <button
                className={`footer-btn ${location.pathname === "/accaunt" ? "active" : ""}
            `} onClick={() => navigate("/accaunt")}>
                <img className='footer-btn-img' src={IconAccaunt} alt="" />
            </button>
        </div>
    )
}

export default footer