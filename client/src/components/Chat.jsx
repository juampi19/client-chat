/* eslint-disable react/prop-types */




import { useEffect, useState } from 'react';
import  {io}  from 'socket.io-client';

const socket = io('http://localhost:3000', {
  autoConnect: false,
});
export const Chat = ({user}) => {
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');


  const localUser = JSON.parse( localStorage.getItem('username') );
  useEffect(() => {
    socket.emit('joinRoom', 'room');
    

    if (user) {
      console.log(user)
      socket.auth = { name: user.name };
      socket.connect();
    
    }

    socket.on('message', (data) => {
      console.log(data)
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    


    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, [user]);



  const sendMessage = () => {
    socket.emit('message', {msg: message, room: 'room' });
    setMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <input
          type="text"
          placeholder="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.user}: {msg.msg}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
