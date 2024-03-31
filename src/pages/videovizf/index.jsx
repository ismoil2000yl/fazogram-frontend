import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs';

const index = () => {

    const myVideo = useRef()

    const [vid, setVid] = useState(true)
    const [aud, setAud] = useState(true)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: vid,
            audio: aud
        }).then((stream) => {
            myVideo.current.srcObject = stream
        })

    }, [vid, aud])

    return (
        <div>
            <video controls={true} playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />
            <div className="flex items-center justify-center gap-4">
                <Button onClick={() => setVid(prev => !prev)}>Video</Button>
                <Button onClick={() => setAud(prev => !prev)}>Audio</Button>
            </div>
        </div>
    )
}

export default index