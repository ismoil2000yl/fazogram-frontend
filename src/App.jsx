import { useEffect, useState } from "react";
import RoutesWrapper from "./routes/routes";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { AppContext, socket } from './context/appContext'

function App() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user)

  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState([])
  const [members, setMembers] = useState([])
  const [messages, setMessages] = useState([])
  const [privateMemberMsg, setPrivateMemberMsg] = useState({})
  const [newMessages, setNewMessages] = useState({})

  useEffect(() => {
    if (user?.username) {
      // navigate("/");
    } else {
      navigate("/auth/login");
    }
  }, [user])

  return <AppContext.Provider value={{
    socket,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    messages,
    setMessages,
    privateMemberMsg,
    setPrivateMemberMsg,
    newMessages,
    setNewMessages
  }}>
    <RoutesWrapper />
  </AppContext.Provider>

}

export default App;
