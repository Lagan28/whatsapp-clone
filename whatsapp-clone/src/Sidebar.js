import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import { Avatar, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";


function Sidebar(){
    return(
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src='https://avatars.githubusercontent.com/u/53617100?v=4'/>
                <div className='sidebar_headerRight'>
                    {/*used to get the button functionality on an icon*/}
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined />
                    <input placeholder='Search or start new Chat' type='text' />
                </div>
            </div>

            <div className='sidebar_chats'>
                <SidebarChat addNewChat/>
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
