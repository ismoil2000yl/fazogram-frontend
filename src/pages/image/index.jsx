import { Button } from 'antd'
import React, { useContext } from 'react'
import { PlusOutlined } from "@ant-design/icons";
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AppContext } from '../../context/appContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconImage from '/src/assets/images/png/image.jpg'
import IconPlus from '/src/assets/images/png/plus.png'

const index = () => {

  const [value, setValue] = useState("")
  const [disableBtn, setDisableBtn] = useState(false)
  const { user } = useSelector(state => state)
  const { socket, currentRoom, setMessages, messages } = useContext(AppContext)


  const [image, setImage] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size > 3048576) {
      toast.error("Rasm xajmi 3 mb dan kichik bolsin...!")
    }
    else {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
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

  const sendData = async () => {
    if (!image) return toast.error("Iltimos post uchun rasm yuklang...!")
    const url = await uploadImage(image)
    try {
      socket.emit("add-post", url, user, time, todayDate, "rasm"),
        setDisableBtn(false),
        toast.success("Rasmli post qo'shildi")
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='rasm'>
      <h3 className='rasm_title'>Rasmli post yaratish:</h3>
      <div className='rasm-image'>
        <label htmlFor="rasm-upload" className='rasm-image-upload'>
          <img className='rasm-image-upload-item' src={imagePreview || IconImage} alt="" />
          <img src={IconPlus} className='rasm-image-upload-picture' alt="" />
        </label>
        <input
          type="file"
          id='rasm-upload'
          hidden
          accept='image/png, image/jpeg, image/jpg'
          onChange={validateImg}
        />
      </div>
      <div className="rasm-btn">
        <Button type='ghost' onClick={sendData} className='rasm-btn-item green-btn'><PlusOutlined />Yaratish</Button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default index