import React,{useState,useEffect} from 'react'
import './Sidebar.css'
import {Avatar, IconButton}   from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat'
import db from './firebase'
import {useStateValue} from "./StateProvider";


export default function Sidebar() {
    const [{user},dispatch] = useStateValue();

    
    const [rooms,setRooms]= useState([])
    useEffect(() => {
        const unsubscribe = db.collection('rooms')
         db.collection("rooms").onSnapshot((snapshot)=>
         setRooms(
             snapshot.docs?.map((doc)=>({
                 id:doc.id,
                 data:doc.data(),
                 name:doc.data().name
             }))
         )
         
         )
         return ()=>{ 
           unsubscribe();
            }
        
     }, [])
     console.log("rooms is>>> ",rooms)

    return (    
        <div className="sidebar">
            <div className="sidebar__header">
           <Avatar src={user?.photoURL} />
           <div className="sidebar__headerRight">
               <IconButton>
               <DonutLargeIcon/>
               </IconButton >
               <IconButton>
               <ChatIcon />
               </IconButton >
               <IconButton>
              <MoreVertIcon/>
               </IconButton >

            </div>

            </div>

            <div className="SearchOutLinedidebar__search">
            <div className="sidebar__searchContainer">
              <SearchOutlinedIcon/>
              <input placeholder="SEARCH or start new chat"
               type="text"/>
                </div>

            </div>

            <div className= "sidebar__chat">
                <SidebarChat addNewChat />
                
                        {  rooms.map (room=> { 
                            return ( 
                       <SidebarChat  key={room.id}
                       id={room.id}
                       name ={room.data.name} 
                       />
                    )})}  
                
                   

            </div>






        </div>
    )
}
