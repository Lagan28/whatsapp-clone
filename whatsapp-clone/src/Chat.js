import React, {useEffect, useState} from 'react'
import './Chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import GifIcon from '@material-ui/icons/Gif';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios'

function Chat({ messages }){
    const [input, setInput] = useState('')
    const [seed, setSeed] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post('/messages/new', {
            message: input,
            name: 'test-app',
            timestamp: 'just now',
            received: true
        })

        setInput('')
    }
    return(
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat_headerInfo'>
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className='chat_body'>
                {messages.map((message) => (
                    <p className={`${message.received && 'chat_receiver'} chat_message`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <span className='chat_timestamp'>{message.timestamp}</span>
                    </p>
                ))}
            </div>

            <div className='chat_footer'>
                <div className='chat_footerIcons'>
                    <InsertEmoticonIcon />
                    <GifIcon />
                </div>
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder='Type a message'
                        type='text' />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
