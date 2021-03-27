import { ImportExportTwoTone } from '@material-ui/icons'
import React,{useState,useEffect} from 'react'
import './Chat.css'
import {Avatar, IconButton}   from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import  {useParams} from 'react-router-dom'
import db from './firebase';
import {useStateValue} from "./StateProvider";
import userEvent from '@testing-library/user-event';
import firebase from 'firebase'



export default function Chat() {
    const [{user},dispatch] = useStateValue();
    const [seed,setSeed] = useState('')
    const[input,setInput]= useState('')
    const {roomId}= useParams();
    const [roomName,setRoomName]= useState();
    const [message,setMessage]= useState([]);


    useEffect(() => {
        if (roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot)=> setRoomName
            (snapshot.data().name))

            db
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot(snapshot=>(
                setMessage(
                    snapshot.docs.map(doc=> doc.data())
                )
            )

            )  

        }
       
    }, [roomId]);




    useEffect (()=> {
        setSeed(Math.floor(Math.random() *500))

    },[])

    const sendMessage =(e)=>{
       e.preventDefault();
       db
       .collection('rooms').doc(roomId).collection('messages').add({
           message:input,
           name: user.displayName,
           timestamp:firebase.firestore.FieldValue.serverTimestamp()
       })

     console.log("you typd",input);
     
     setInput('')
    };


    return (
        <div className='chat'>
            <div className="chat__header">
             <Avatar src={`https://avatars.dicebear.com/api/female/${seed}.svg`} />

             <div
             className="chat__headerinfo">
                <h3>{roomName}</h3>
                <p>last seen {''}
                {new Date(
                     message[message.length-1]?.timestamp?.toDate()
                    ).toUTCString()
                }</p>
             </div>

             <div className="chat__headerright">
             <IconButton>
             <SearchOutlinedIcon/>
               </IconButton >
               <IconButton>
               <AttachFileOutlinedIcon />
               </IconButton >
               <IconButton>
               <MoreVertIcon />
               </IconButton>

             </div>
            </div>

            <div className='chat__body'>
                {message.map(message=>(
                    <p className={`chat__message ${message.name===user.displayName && `chat_reciever`} `}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {new Date (message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>

                ))}
              
            </div>

            <div className="chat__footer">
                <EmojiEmotionsOutlinedIcon/>
                <form>
                    <input
                    value={input}
                    onChange={(e)=> setInput(e.target.value)}
                    placeholder="type your message"
                    type="text" 
                    />
                    <button
                    type="submit"
                    onClick={sendMessage}
                    >send a message </button>
                </form>
                <MicOutlinedIcon/>
            </div>
            
        </div>
    )
}
