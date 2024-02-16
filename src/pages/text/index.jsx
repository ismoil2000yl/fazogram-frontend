import { Button } from 'antd'
import React, { useContext } from 'react'
import { PlusOutlined } from "@ant-design/icons";
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AppContext } from '../../context/appContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const index = () => {

    const [value, setValue] = useState("")
    const [disableBtn, setDisableBtn] = useState(false)
    const { user } = useSelector(state => state)
    const { socket, currentRoom, setMessages, messages } = useContext(AppContext)

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

    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;

    const sendData = () => {
        try {
            socket.emit("add-post", value, user, time, todayDate, "matn"),
                setDisableBtn(false),
                setValue(""),
                toast.success("Matnli post qo'shildi")
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='text'>
            <h3 className='text_title'>Matnli post yaratish:</h3>
            <div className="text_box">
                <textarea value={value} placeholder={"Nima yangiliklar?"} onChange={(e) => setValue(e.target.value)} className='text_box_item' rows="20"></textarea>
            </div>
            <div className="text_btn">
                <Button onClick={() => { setDisableBtn(true), sendData() }} disabled={disableBtn} type='ghost' className={`${disableBtn ? "green-disable-btn" : "green-btn"}`}><PlusOutlined />{disableBtn ? "Yaratilmoqda..." : "Yaratish"}</Button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default index