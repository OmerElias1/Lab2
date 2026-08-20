import { useState } from 'react'
import './App.css'

export default function App() {
  const [username,setUserName]=useState("");
  const [password,setPassword]=useState("")
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  return (
    <div>
      {
        isLoggedIn?(<>
        <p>Welcome {username}</p>
        <button onClick={()=>{setIsLoggedIn(false)}}>Logout</button></>
        ):
        (
        <>
          <input type="text" placeholder='username'/>
          <input type="password" placeholder='password' />
          <button onClick={()=>{setIsLoggedIn(true)}}>Login</button>
        </>
        )
      }
    </div>
  ) 
}
