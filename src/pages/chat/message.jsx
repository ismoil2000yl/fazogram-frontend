import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/appContext'
import { useSelector } from 'react-redux'
import IconFile from '/src/assets/images/png/file.png'
import IconSend from '/src/assets/images/png/send.png'
import { Modal } from 'antd'

const index = () => {

    const [message, setMessage] = useState("")
    // const [messages, setMessages] = useState([])
    const user = useSelector(state => state.user)
    const { socket, currentRoom, setMessages, messages } = useContext(AppContext)
    const messageEndRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    const [image, setImage] = useState(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

    const todayDate = getFormattedDate()

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
    });

    const validateImg = (e) => {
        const file = e.target.files[0];
        if (file.size > 5048576) {
            toast.error("Rasm xajmi 5 mb dan kichik bolsin...!")
        }
        else {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
            setIsOpen(true)
        }
    }

    const uploadImage = async () => {
        const data = new FormData();
        data.append("file", image);
        data.append('upload_preset', "owyprrzl");
        try {
            setUploadingImage(true)
            let res = await fetch("https://api.cloudinary.com/v1_1/ismoil2000yl/image/upload", {
                method: "POST",
                body: data
            })
            const urlData = await res.json()
            setUploadingImage(false)
            return urlData.url
        }
        catch (error) {
            setUploadingImage(false)
            console.log(error)
        }
    }

    async function handleSubmit(e) {
        // if (!message) return;
        const picture = await uploadImage(image)
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDate, picture);
        setMessage("");
        if (isOpen) {
            setMessage(" ")
        }
        setIsOpen(false)
        setImage(null)
        setUploadingImage(false)
        setImagePreview(false)
    }

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className='msg'>
            <div className="msg-box">
                {
                    messages.map(({ _id: date, messagesByDate }, idx) => {
                        return (
                            <div key={idx}>
                                <h4 className='t-c'>{date}</h4>
                                {
                                    messagesByDate.map(({ content, time, from: sender, picture }, msgIdx) => {
                                        return (
                                            <>
                                                <div key={msgIdx} className={`msg-box-item-${sender.username === user.username ? "me" : "you"}`}>
                                                    <div className={`msg-box-item-${sender.username === user.username ? "me" : "you"}-info`}>
                                                        {
                                                            picture ?
                                                                <div className={`msg-box-item-${sender.username === user.username ? "me" : "you"}-info-img`}>
                                                                    <img src={picture} alt="" />
                                                                </div>
                                                                : null
                                                        }
                                                        {
                                                            content ?
                                                                <p className={`msg-box-item-${sender.username === user.username ? "me" : "you"}-info-text`}>{content}</p> : null
                                                        }
                                                        <span className={`msg-box-item-${sender.username === user.username ? "me" : "you"}-info-data`}>
                                                            {time}
                                                        </span>
                                                    </div>
                                                    <div className={`msg-box-item-${sender.username === user.username ? "me" : "you"}-img`}>
                                                        <img src={sender.picture} alt="" />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                <div ref={messageEndRef} />
            </div>
            <div className="msg-group">
                <div className="msg-group-file">
                    <button className='msg-group-file-item'>
                        <label htmlFor="file-btn">
                            <img src={IconFile} alt="" />
                            <input
                                type="file"
                                id='file-btn'
                                onChange={validateImg}
                                accept='image/png, image/jpeg, image/jpg'
                            />
                        </label>
                    </button>
                </div>
                <div className="msg-group-text">
                    <textarea
                        className='msg-group-text-item'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(event) => {
                            event.key === "Enter" && handleSubmit();
                        }}
                    />
                </div>
                <div className="msg-group-btn">
                    <button className='msg-group-btn-item' onClick={handleSubmit}>
                        <img src={IconSend} alt="" />
                    </button>
                </div>
            </div>
            <Modal
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={false}
                // className={"msg-modal"}
            >
                <div className='msg-seen' onClick={() => setIsOpen(false)}>
                    <img src={imagePreview} alt="" />
                </div>
                <div className="msg-pc">
                    <div className="msg-pc-input">
                        <textarea
                            className='msg-pc-input-item'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(event) => {
                                event.key === "Enter" && handleSubmit();
                            }}
                        />
                    </div>
                    <div className="msg-pc-btn">
                        <button className='msg-pc-btn-item' onClick={handleSubmit}>
                            <img src={IconSend} alt="" />
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default index