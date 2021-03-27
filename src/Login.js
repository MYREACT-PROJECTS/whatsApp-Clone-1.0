import React from 'react';
import './Login.css';
import {auth,provider} from './firebase'
import {Button}   from "@material-ui/core"
import {useStateValue} from "./StateProvider";
import { actionTypes } from './Reducer';



export default function Login() {
    const [{},dispatch] = useStateValue();
     
    const signIn =()=>{
        auth
        .signInWithPopup(provider)
        .then((results)=> {
            dispatch(
                {
                    type:actionTypes.SET_USER,
                    user:results.user
                }
            )
        })
        .catch((error)=> alert(error.message))
        

        
    }

    return (
        <div className='login'>
            <div className="login__container">
              <img
              src="https://i.pinimg.com/originals/91/08/3a/91083a3774555ce1cddc5178a0f5c552.png"
              alt=''
              />
              <div className='login__text'>
                  <h1>Sign in to WhatsApp</h1>

              </div>  
              <Button
              type="submit"f
              onClick={signIn}
              >
                  Sign With Google

              </Button>

            </div>
        </div>
    )
}
