import { useNavigate } from 'react-router-dom'
import IconSee from '/src/assets/images/png/see.png'
import IconNotSee from '/src/assets/images/png/notsee.png'
import { useEffect, useState } from 'react'
import { useLoginUserMutation } from '../../../services/appApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { AppContext } from '../../../context/appContext'

const index = () => {

  const navigate = useNavigate()
  const [seen, setSeen] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { socket } = useContext(AppContext)

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

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

  const handleSubmit = () => {
    loginUser({ username, password }).then(({ data }) => {
      if (data) {
        // socket work
        socket.emit('new-user')
        // navigate to the chat
        navigate("/");
      }
    });
  }
  useEffect(() => {
    toast.error(error?.data?.error)
  }, [error])


  return (
    <div className='sign'>
      <div className="sign__box">
        <div className="sign__box__inbox">
          <h1 className="sign__box__inbox__title">Fazogram</h1>
          <div className="sign__box__inbox__inbox">
            <label htmlFor="username">
              <input
                id='username'
                type="text"
                placeholder='Username'
                className='sign__box__inbox__inbox__input'
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="password" className='password'>
              <input
                id='password'
                type="password"
                placeholder='Password'
                className='sign__box__inbox__inbox__input'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className='see' onClick={seeFunction}>
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
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
          <div className="sign__box__inbox__sign">
            <p>Don't have an accaunt?</p>
            <button onClick={() => navigate('/auth/register')} className="sign__box__inbox__sign__btn">Sign Up</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default index