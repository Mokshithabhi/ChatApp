import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Chat:React.FC = () => {
    const [messages,setMessages] = useState([])
    const socket = io('http://localhost:4000/');
    useEffect(() => {
        socket.on('receiveMessage', (message) => {
        //   setMessages((prev) => [...prev, message]);
        });
      }, []);
  return (

    <div>chat</div>
  )
}

export default Chat