import React, {useEffect, useState} from 'react'
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from 'pusher-js'
import axios from './axios'
import Login from './Login'

function App() {
    const [user,setUser] = useState(null)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios.get('/messages/sync')
            .then(response => {
                setMessages(response.data)
            })
    }, [])

    console.log(messages)

    useEffect (() => {
        const pusher = new Pusher('626666ad3d5af48325d2', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(newMessage) {
            setMessages([...messages, newMessage]); //push whatever you have inside of messages and the newMessage
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }

    }, [messages])

  return (
    <div className="app">
        {!user ? (
            <Login />
        ): (
            <div className='app_body'>
                <Sidebar />
                <Chat messages={messages}/>
            </div>
        )}

    </div>
  );
}

export default App;
