import React from 'react'
import { io } from 'socket.io-client'
// const SOCKET_URL = "https://fgram.foxdev.uz/"
const SOCKET_URL = "https://fazogram-backend.onrender.com"


export const socket = io(SOCKET_URL)
export const AppContext = React.createContext()