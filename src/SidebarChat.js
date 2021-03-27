import React,{useEffect,useState} from 'react'
import './SidebarChat.css'
import {Avatar, IconButton}   from "@material-ui/core"
import db from './firebase'
import {Link } from 'react-router-dom'





export default function SidebarChat({id,name,addNewChat}) {
    const [seed,setSeed] = useState('')
    const[messages,setMessages]=useState([]);
    useEffect (()=> {
        setSeed(Math.floor(Math.random() *500))

    },[])


    useEffect(() => {
         if(id){
             db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>(
              setMessages(
                  snapshot.docs.map((doc)=>doc.data())))
                  )
         }

         

    }, [id])

    const creatChat =()=>{
        const roomName=prompt("please ENTER NAME FOR CHAT")
        if(roomName){
            //do some clever dtaatbase stuff
            db.collection('rooms').add({
                name:roomName
            })
        }

    }

    return !addNewChat ? (
        <Link to = {`/rooms/${id}`}>
        <div className='sidebarchat'>
            <Avatar src={`https://avatars.dicebear.com/api/female/${seed}.svg`}
            />
            <div className="sidebareChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>

            </div>
        </div>
        </Link>
    ):(
        <div 
        onClick={creatChat}
        className='sidebarchat'
        
        >
          <h2>Add new chat </h2>  

        </div>
    )
    }