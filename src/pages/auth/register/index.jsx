import { useNavigate } from 'react-router-dom'
import IconSee from '/src/assets/images/png/see.png'
import IconNotSee from '/src/assets/images/png/notsee.png'
import { useState } from 'react'
import IconImage from '/src/assets/images/png/image.jpg'
import IconPlus from '/src/assets/images/png/plus.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSignupUserMutation } from '../../../services/appApi'
import { useEffect } from 'react'

const index = () => {

  const navigate = useNavigate()
  const [seen, setSeen] = useState(false)

  const [fullname, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [signupUser, { isLoading, error }] = useSignupUserMutation()

  const [image, setImage] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const seeFunction = () => {
    if (seen) {
      document.getElementById("password").setAttribute("type", "password")
      setSeen(false)
    }
    else {
      document.getElementById("password").setAttribute("type", "text")
      setSeen(true)
    }
  }

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

  const handleSubmit = async () => {
    if (!image) return toast.error("Iltimos profil rasmini yuklang...!")
    const url = await uploadImage(image)
    signupUser({ username, fullname, password, picture: url, }).then(({ data }) => {
      if (data) {
        navigate("/")
      }
    })
  }
  useEffect(() => {
    toast.error(error?.data)
  }, [error])


  return (
    <div className='sign'>
      <div className="sign__box">
        <div className="sign__box__inbox">
          <h1 className="sign__box__inbox__title">Fazogram</h1>
          <div className="sign__box__inbox__inbox">
            <div className='sign-image'>
              <label htmlFor="image-upload" className='sign-label'>
                <img className='sign-image-item' src={imagePreview || IconImage} alt="" />
                <img src={IconPlus} className='add-picture' alt="" />
              </label>
              <input
                type="file"
                id='image-upload'
                hidden
                accept='image/png, image/jpeg, image/jpg'
                onChange={validateImg}
              />
            </div>
            <label htmlFor="username">
              <input
                id='username'
                type="text"
                placeholder='Username'
                className='sign__box__inbox__inbox__input'
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="fullname">
              <input
                id='fullname'
                type="text"
                placeholder='Full Name'
                onChange={(e) => setFullName(e.target.value)}
                className='sign__box__inbox__inbox__input'
              />
            </label>
            <label htmlFor="password" className='password'>
              <input
                id='password'
                type="password"
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                className='sign__box__inbox__inbox__input'
              />
              <button className='see' disabled={isLoading} onClick={seeFunction}>
                {
                  seen ?
                    <img src={IconSee} alt="" />
                    :
                    <img src={IconNotSee} alt="" />
                }
              </button>
            </label>
            <button
              className="sign-btn"
              onClick={handleSubmit}
              disabled={uploadingImage}
            >
              {uploadingImage ? "Loading..." : "Register"}
            </button>
          </div>
          <div className="sign__box__inbox__sign">
            <p>Already have an accaunt?</p>
            <button onClick={() => navigate('/auth/login')} className="sign__box__inbox__sign__btn">Sign In</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default index